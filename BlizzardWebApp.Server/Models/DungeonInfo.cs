using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class DungeonInfo
    {
        [JsonPropertyName("key")]
        public HRef Href { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("id")]
        public int Id { get; set; }
    }
}
