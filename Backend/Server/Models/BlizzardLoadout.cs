using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class BlizzardLoadout
    {
        [JsonPropertyName("is_active")]
        public bool IsActive { get; set; }

        [JsonPropertyName("talent_loadout_code")]
        public string LoadoutCode { get; set; }

        [JsonPropertyName("selected_class_talent_tree")]
        public BlizzardKNI SelectedClass { get; set; }

        [JsonPropertyName("selected_spec_talent_tree")]
        public BlizzardKNI SelectedSpec { get; set; }

        [JsonPropertyName("selected_hero_talent_tree")]
        public BlizzardKNI SelectedHero { get; set; }
    }
}
