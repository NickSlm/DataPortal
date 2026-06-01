using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models.MythicKeystones
{
    public class MythicLeaderboard
    {

        [JsonPropertyName("leading_groups")]
        public List<Group> LeadingGroups { get; set; }
        public string LeaderboardId { get; set; }
    }
}
