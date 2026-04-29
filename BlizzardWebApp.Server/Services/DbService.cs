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
    }
}
