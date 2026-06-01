using Microsoft.EntityFrameworkCore;

namespace BlizzardWebApp.Server.Data.KeystoneLeaderboard
{
    [Index(nameof(LeaderboardId))]
    public class Group
    {
        public int Id { get; set; }
        public int Ranking { get; set; }
        public int Duration { get; set; }
        public int KeystoneLevel { get; set; }

        public int LeaderboardId { get; set; }
        public Leaderboard Leaderboard {get;set;}

        public List<GroupMember> GroupMembers { get; set; }

    }
}
