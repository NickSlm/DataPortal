using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class BlizzardPvpStatistics
    {
        [JsonPropertyName("pvp_map_statistics")]
        public List<BlizzardMapStatistics> Map_Statistics { get; set; }
    }
}
