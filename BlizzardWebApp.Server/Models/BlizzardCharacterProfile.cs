using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class BlizzardCharacterProfile
    {

        [JsonPropertyName("faction")]
        public BlizzardFaction Faction { get; set; }

        [JsonPropertyName("race")]
        public BlizzardKNI Race { get; set; }

        [JsonPropertyName("character_class")]
        public BlizzardKNI Class { get; set; }

        [JsonPropertyName("active_spec")]
        public BlizzardKNI Spec { get; set; }

        [JsonPropertyName("level")]
        public int Level { get; set; }

        [JsonPropertyName("achievement_points")]
        public int Achievements { get; set; }

        [JsonPropertyName("average_item_level")]
        public int ItemLevel { get; set; }

    }
}
