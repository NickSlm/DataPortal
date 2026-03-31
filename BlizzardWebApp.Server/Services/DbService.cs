using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Dto;
using BlizzardWebApp.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            var realms = await _blizzardApi.GetConnectedRealms();

            foreach (var realm in realms)
            {
                var realmDb = new ConnectedRealmsDb
                {
                    Id = realm.Id,
                    MythicLeaderboard = realm.MLeaderboardHref.Href,
                    Auctions = realm.AuctionHref.Href,
                    Realms = realm.RealmData.Select(e => new RealmDb
                    {
                        Id = e.Id,
                        Name = e.Name["en_US"],
                        Slug = e.Slug,
                        Category = e.Category["en_US"]
                    }).ToList()
                   
                };
                _dbContext.Add(realmDb);
            }
            await _dbContext.SaveChangesAsync();
        }
    }
}
