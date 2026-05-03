using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models.MythicKeystones
{
    public class Member
    {
        [JsonPropertyName("profile")]
        public Character Profile { get; set; }
    }
}
