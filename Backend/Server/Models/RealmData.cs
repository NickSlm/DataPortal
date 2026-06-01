using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class RealmData
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public Dictionary<string, string> Name { get; set; }      

        [JsonPropertyName("category")]
        public Dictionary<string, string> Category { get; set; }

        [JsonPropertyName("slug")]
        public string Slug { get; set; }


    }
}
