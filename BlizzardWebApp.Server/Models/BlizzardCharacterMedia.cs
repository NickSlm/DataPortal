using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class BlizzardCharacterMedia
    {
        [JsonPropertyName("assets")]
        public List<BlizzardAsset> Assets { get; set; }
    }
}
