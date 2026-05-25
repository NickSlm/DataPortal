using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class BlizzardMapStatistics
    {
        [JsonPropertyName("world_map")]
        public BlizzardWorldMap WorldMap { get; set; }

        [JsonPropertyName("match_statistics")]
        public Statistics MatchStatistics { get; set; }
    }
}
