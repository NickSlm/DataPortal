using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class Character
    {

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("realm")]
        public Realm Realm { get; set; }

    }
}
