using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class MythicLeaderboards
    {
        [JsonPropertyName("current_leaderboards")]
        public List<BlizzardKNI> MythicKeystones { get; set; }

    }
}
