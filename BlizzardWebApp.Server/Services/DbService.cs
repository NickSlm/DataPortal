using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Dto;
using BlizzardWebApp.Server.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BlizzardWebApp.Server.Services
{
    public class DbService: IDbService
    {
        private readonly LbDbContext _dbContext;
        public DbService(LbDbContext dbContext)
        {
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

    }
}
