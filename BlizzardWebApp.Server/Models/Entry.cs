using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class Entry
    {

        [JsonPropertyName("character")]
        public Character Character { get; set; }

        [JsonPropertyName("rank")]
        public int Rank { get; set; }

        [JsonPropertyName("faction")]
        public Dictionary<string, string> Faction { get; set; }

        [JsonPropertyName("rating")]
        public int Rating { get; set; }

        [JsonPropertyName("season_match_statistics")]
        public Statistics Season_Match_Statistics { get; set; }

    }
}
