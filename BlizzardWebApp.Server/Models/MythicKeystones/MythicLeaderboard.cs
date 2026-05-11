using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models.MythicKeystones
{
    public class MythicLeaderboard
    {

        [JsonPropertyName("leading_groups")]
        public List<Group> LeadingGroups { get; set; }

        [JsonPropertyName("keystone_affixes")]
        public List<KeystoneAffix> KeystoneAffixes { get; set; }
        public string LeaderboardId { get; set; }
    }
}
