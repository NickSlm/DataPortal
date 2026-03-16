using Microsoft.EntityFrameworkCore;

namespace BlizzardWebApp.Server.Data
{
    public class LbDbContext : DbContext
    {

        public LbDbContext(DbContextOptions<LbDbContext> options):base(options)
        {

        }

        public DbSet<LeaderboardEntry> LeaderboardEntry { get; set; }
        public DbSet<LeaderboardSnapshot> LeaderboardSnapshots { get; set; }

    }
}
