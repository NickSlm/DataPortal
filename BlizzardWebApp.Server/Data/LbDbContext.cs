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
        public DbSet<ConnectedRealmsDb> ConnectedRealms { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ConnectedRealmsDb>()
                .HasMany(c => c.Realms)
                .WithOne(c => c.ConnectedRealm)
                .HasForeignKey(c => c.CRealmsId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
