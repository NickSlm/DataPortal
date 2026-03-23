using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class Leaderboard
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("entries")]
        public List<Entry> Entries { get; set; }
    }
}
