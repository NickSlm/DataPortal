using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class BlizzardWorldMap
    {
        [JsonPropertyName("name")]
        public Dictionary<string, string> Name { get; set; }

        [JsonPropertyName("id")]
        public int Id { get; set; }

    }
}
