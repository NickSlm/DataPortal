using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class BlizzardAsset
    {
        [JsonPropertyName("key")]
        public string Key { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }
    }
}
