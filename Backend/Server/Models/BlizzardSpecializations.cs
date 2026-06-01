using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class BlizzardSpecializations
    {
        [JsonPropertyName("specializations")]
        public List<BlizzardSpecialization> Specializations { get; set; }
    }
}
