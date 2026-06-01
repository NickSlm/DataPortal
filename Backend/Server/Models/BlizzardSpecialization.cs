using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class BlizzardSpecialization
    {
        [JsonPropertyName("loadouts")]
        public List<BlizzardLoadout> Loadouts { get; set; }
    }
}
