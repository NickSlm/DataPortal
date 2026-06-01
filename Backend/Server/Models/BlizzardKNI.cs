using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class BlizzardKNI
    {
        [JsonPropertyName("key")]
        public HRef Href { get; set; }

        [JsonPropertyName("name")]
        public Dictionary<string, string> Name { get; set; }

        [JsonPropertyName("id")]
        public int Id { get; set; }



    }
}
