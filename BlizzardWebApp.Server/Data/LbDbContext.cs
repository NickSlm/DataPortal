using BlizzardWebApp.Server.Models;
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
        public DbSet<MythicKeystoneDb> Keystones { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ConnectedRealmsDb>(e =>
            {
                e.HasKey(c => c.Id);
                e.Property(c => c.Id).ValueGeneratedNever();

                e.HasMany(c => c.Realms)
                .WithOne(c => c.ConnectedRealm)
                .HasForeignKey(c => c.CRealmsId)
                .OnDelete(DeleteBehavior.Cascade);

            });

            modelBuilder.Entity<RealmDb>(e =>
            {
                e.HasKey(r => r.Id);
            });
        }
    }
}
