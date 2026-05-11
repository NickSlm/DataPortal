using Microsoft.EntityFrameworkCore;

namespace BlizzardWebApp.Server.Data.KeystoneLeaderboard
{
    [Index(nameof(LeaderboardId))]
    public class Leaderboard
    {
        public int Id { get; set; }
        public string LeaderboardId { get; set; }
        public List<Group> LeadingGroups { get; set; }
    }
}
