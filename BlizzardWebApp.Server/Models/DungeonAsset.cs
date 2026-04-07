using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class DungeonAsset
    {
        [JsonPropertyName("assets")]
        public List<AssetItem> Assets { get; set; }

    }
}
