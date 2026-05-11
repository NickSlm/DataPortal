using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models.MythicKeystones
{
    public class Affix
    {

        [JsonPropertyName("name")]
        public Dictionary<string, string> Name { get; set; }

        [JsonPropertyName("id")]
        public int Id { get; set; }
    }
}
