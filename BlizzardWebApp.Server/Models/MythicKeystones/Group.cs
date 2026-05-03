using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models.MythicKeystones
{
    public class Group
    {
        [JsonPropertyName("ranking")]
        public int Ranking { get; set; }

        [JsonPropertyName("duration")]
        public int Duration { get; set; }

        [JsonPropertyName("keystone_level")]
        public int KeystoneLevel { get; set; }

        [JsonPropertyName("members")]
        public List<Character> Members { get; set; }


    }
}
