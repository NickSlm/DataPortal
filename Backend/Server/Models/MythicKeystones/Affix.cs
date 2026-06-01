using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models.MythicKeystones
{
    public class Affix
    {

        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }

    }
}
