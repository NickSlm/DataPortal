using BlizzardWebApp.Server.Data;
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
    }
}
