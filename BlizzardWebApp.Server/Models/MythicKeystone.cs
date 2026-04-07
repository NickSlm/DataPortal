using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class MythicKeystone
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("key")]
        public HRef Href { get; set; }

        [JsonPropertyName("name")]
        public Dictionary<string, string> Name { get; set; }



    }
}
