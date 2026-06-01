using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class Statistics
    {

        [JsonPropertyName("played")]
        public int Played { get; set; }

        [JsonPropertyName("won")]
        public int Won { get; set; }

        [JsonPropertyName("lost")]
        public int lost { get; set; }

    }
}
