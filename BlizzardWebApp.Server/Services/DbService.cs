using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Dto;
using BlizzardWebApp.Server.Interfaces;
using BlizzardWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using Polly;

namespace BlizzardWebApp.Server.Services
{
    public class DbService: IDbService
    {
        private readonly IBlizzardApiService _blizzardApi;
        private readonly LbDbContext _dbContext;

        public DbService(LbDbContext dbContext, IBlizzardApiService blizzardApi)
        {
            _blizzardApi = blizzardApi;
            _dbContext = dbContext;
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
    }
}
