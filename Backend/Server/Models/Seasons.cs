using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class Seasons
    {
        [JsonPropertyName("seasons")]
        public List<Season> seasons { get; set; }

        [JsonPropertyName("current_season")]
        public Season current_season { get; set; }
    }
}
