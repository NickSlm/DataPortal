using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class HRef
    {

        [JsonPropertyName("href")]
        public string Href { get; set; }
    }
}
