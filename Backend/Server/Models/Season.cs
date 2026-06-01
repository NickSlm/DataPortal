using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class Season
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
    }
}
