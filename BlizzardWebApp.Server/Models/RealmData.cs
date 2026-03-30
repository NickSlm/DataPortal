using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class RealmData
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        //CHANGE TO OBJECT
        public string Name { get; set; }
        //CHANGE TO OBJECT
        [JsonPropertyName("category")]
        public string Category { get; set; }

        [JsonPropertyName("slug")]
        public string Slug { get; set; }


    }
}
