using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Dto;
using BlizzardWebApp.Server.Interfaces;
using BlizzardWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using Polly;
using System.IO;
using System;
using NuGet.ContentModel;
using NuGet.Common;
using System.Threading;
using BlizzardWebApp.Server.Models.MythicKeystones;

namespace BlizzardWebApp.Server.Services
{
    public class DbService: IDbService
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        private readonly IBlizzardApiService _blizzardApi;
        private readonly LbDbContext _dbContext;
        private readonly ILoggingService _logger;

        public DbService(LbDbContext dbContext, IBlizzardApiService blizzardApi, ILoggingService logger)
        {
            _blizzardApi = blizzardApi;
            _dbContext = dbContext;
            _logger = logger;
        }
        public async Task<List<LeaderboardSnapshot>> ListSnapshots()
        {
            var snapshots = await _dbContext.LeaderboardSnapshots
                .ToListAsync();

            return snapshots;
        }
        public async Task<List<LeaderboardEntry>> GetEntriesByDate(DateTime dateTime)
        {

            var snapshot = await _dbContext.LeaderboardSnapshots
                .Where(s => s.DatePulled.Date == dateTime.Date)
                .FirstOrDefaultAsync();

            var entries = await _dbContext.LeaderboardEntry.Where(e => snapshot.Id == e.SnapshotId).ToListAsync();
            return entries;
        }
        public async Task<List<ConnectedRealmDto>> GetRealms()
        {
            var realms = await _dbContext.ConnectedRealms.Select(c => new ConnectedRealmDto
            {
                Id = c.Id,
                Realms = c.Realms.Select(r => new RealmDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Category = r.Category
                }).ToList()
            }).ToListAsync();

            return realms;
        }
        public async Task<List<MythicKeystoneDb>> GetKeystonesData()
        {
            var keystones = await _dbContext.Keystones.Select(k => new MythicKeystoneDb
            {
                Id = k.Id,
                DungeonId = k.DungeonId,
                Name = k.Name,
                ImagePath = k.ImagePath
            }).ToListAsync();
            return keystones;
        }
        public async Task<PaginatedResultDto<KeystoneGroupDto>> GetKeystoneLeaderboard(int realmId, int keystoneId, int page)
        {
            var leaderboardId = $"{realmId}-{keystoneId}";

            var leaderboard = await _dbContext.KeystoneLeaderboards
            .FirstOrDefaultAsync(l => l.LeaderboardId == leaderboardId);

            if (leaderboard == null)
            {
                return null;
            }

            var groups = await _dbContext.Group
                .Where(g => g.LeaderboardId == leaderboard.Id)
                .Select(g => new { g.Id, g.Ranking, g.Duration, g.KeystoneLevel })
                .Skip((page - 1) * 50)
                .Take(50)
                .ToListAsync();

            var groupIds = groups.Select(g => g.Id).ToList();
            var members = await _dbContext.GroupMember
                .Where(gm => groupIds.Contains(gm.GroupId))
                .Select(gm => new { gm.GroupId, gm.Member.Name, gm.Member.Realm })
                .ToListAsync();

            var leaderboardDto = groups.Select(g => new KeystoneGroupDto
            {
                Ranking = g.Ranking,
                Duration = g.Duration,
                KeystoneLevel = g.KeystoneLevel,
                GroupMembers = members
                    .Where(m => m.GroupId == g.Id)
                    .Select(m => new Dictionary<string, string>
                    {
            { "Name", m.Name },
            { "Slug", m.Realm }
                    }).ToList()
            }).ToList();

            int totalGroups = await _dbContext.Group
                .CountAsync(g => g.LeaderboardId == leaderboard.Id);

            var paginatedResDto = new PaginatedResultDto<KeystoneGroupDto>
            {
                Data = leaderboardDto,
                TotalPages = (int)Math.Ceiling(totalGroups / (double)50),
                TotalCount = totalGroups,
                CurrentPage = page,
                LastFetchTime = leaderboard.LastFetchTime
            };

            return paginatedResDto;
        }
        public async Task SaveConnectedRealms()
        {
            var connectedRealms = await _blizzardApi.GetConnectedRealms();

            var incomingIds = connectedRealms.Select(c => c.Id).ToList();

            var existingRealms = await _dbContext.ConnectedRealms
                .Include(c => c.Realms)
                .Where(c => incomingIds.Contains(c.Id))
                .ToDictionaryAsync(c => c.Id);

            foreach (var realm in connectedRealms)
            {
                if (existingRealms.TryGetValue(realm.Id, out var existing))
                {
                    existing.MythicLeaderboard = realm.MLeaderboardHref?.Href;
                    existing.Auctions = realm.AuctionHref?.Href;

                    _dbContext.RemoveRange(existing.Realms);
                    existing.Realms = realm.RealmData.Select(e => new RealmDb
                    {
                        Id = e.Id,
                        Name = e.Name["en_US"],
                        Slug = e.Slug,
                        Category = e.Category["en_US"]
                    }).ToList();
                }
                else
                {
                    var newRealm = new ConnectedRealmsDb
                    {
                        Id = realm.Id,
                        MythicLeaderboard = realm.MLeaderboardHref?.Href,
                        Auctions = realm.AuctionHref?.Href,
                        Realms = realm.RealmData.Select(e => new RealmDb
                        {
                            Id = e.Id,
                            Name = e.Name["en_US"],
                            Slug = e.Slug,
                            Category = e.Category["en_US"]
                        }).ToList()

                    };
                    _dbContext.ConnectedRealms.Add(newRealm);
                }
            }


            await _dbContext.SaveChangesAsync();
        }
        public async Task SaveKeystonesData()
        {
            var keystones = await _blizzardApi.GetMythicKeystones();

            var incomingId = keystones.Select(k => k.Id).ToList();

            var existingKeystones = await _dbContext.Keystones
                .Where(k => incomingId.Contains(k.Id))
                .ToDictionaryAsync(k => k.Id);


            foreach (var key in keystones)
            {
                if (existingKeystones.TryGetValue(key.Id, out var existing))
                {
                    existing.DungeonId = key.DungeonId;
                    existing.ImagePath = key.ImagePath;
                }
                else
                {
                    _dbContext.Keystones.Add(key);
                }
            }
            await _dbContext.SaveChangesAsync();
        }
        public async Task SaveKeystoneLeaderboardAsync()
        {
            var semaphore = new SemaphoreSlim(5);

            var keystones = await _dbContext.Keystones.Select(k => k.Id).ToListAsync();
            var realms = await _dbContext.ConnectedRealms.Select(r => r.Id).ToListAsync();

            var tasks = keystones.SelectMany(key => realms.Select(async realm =>
            {
                await semaphore.WaitAsync();
                try
                {
                    return await _blizzardApi.GetCurrentMythicLeaderboardsAsync(realm, key);
                }
                finally
                {
                    semaphore.Release();
                }
            })).ToList();

            var leaderboards = await Task.WhenAll(tasks);

            Console.WriteLine("====================================Pulled NOW SAVING================================");

            var allMemberId = leaderboards.SelectMany(lb => lb.LeadingGroups).SelectMany(g => g.Members).Select(m => m.Profile.Id).Distinct().ToHashSet();
            var existingMembers = await _dbContext.Member.Where(m => allMemberId.Contains(m.Id)).ToDictionaryAsync(m => m.Id);

            var LeaderboardId = leaderboards.Select(lb => lb.LeaderboardId).ToHashSet();
            var existingLeaderboards = await _dbContext.KeystoneLeaderboards
                .Include(l => l.LeadingGroups)
                .Where(l => LeaderboardId.Contains(l.LeaderboardId))
                .ToDictionaryAsync(l => l.LeaderboardId);

            
            foreach (var leaderboard in leaderboards)
            {
                if (existingLeaderboards.TryGetValue(leaderboard.LeaderboardId, out var existing)){
                    _dbContext.RemoveRange(existing.LeadingGroups);
                    existing.LeadingGroups = CreateGroups(leaderboard.LeadingGroups, existingMembers);
                    existing.LastFetchTime = DateTime.UtcNow;
                }
                else
                {
                    var newLeaderboard = new Data.KeystoneLeaderboard.Leaderboard
                    {
                        LeaderboardId = leaderboard.LeaderboardId,
                        LastFetchTime = DateTime.UtcNow,
                        LeadingGroups = CreateGroups(leaderboard.LeadingGroups, existingMembers)
                    };
                    _dbContext.KeystoneLeaderboards.Add(newLeaderboard);
                }
            }
            await _dbContext.SaveChangesAsync();
        }
        private List<Data.KeystoneLeaderboard.Group> CreateGroups(List<Group> leadingGroups, Dictionary<int, Data.KeystoneLeaderboard.Member> memberCache)
        {
            var newGroups = leadingGroups.Select(lg => new Data.KeystoneLeaderboard.Group
            {
                Duration = lg.Duration,
                Ranking = lg.Ranking,
                KeystoneLevel = lg.KeystoneLevel,
                GroupMembers = lg.Members.Select(m =>
                {
                    if (!memberCache.TryGetValue(m.Profile.Id, out var member))
                    {
                        member = new Data.KeystoneLeaderboard.Member
                        {
                            Id = m.Profile.Id,
                            Name = m.Profile.Name,
                            Realm = m.Profile.Realm.Slug
                        };
                        memberCache[m.Profile.Id] = member;
                    }
                    return new Data.KeystoneLeaderboard.GroupMember
                    {
                        Member = member
                    };
                }).ToList()
            }).ToList();
            return newGroups;
        } 
    }
}
