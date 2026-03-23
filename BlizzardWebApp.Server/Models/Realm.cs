using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class Realm
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("slug")]
        public string Slug { get; set; }

    }
}
