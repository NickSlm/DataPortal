using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class Dungeon
    {

        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("dungeon")]
        public DungeonInfo Info { get; set; }

    }
}
