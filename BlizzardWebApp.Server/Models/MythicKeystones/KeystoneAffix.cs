using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models.MythicKeystones
{
    public class KeystoneAffix
    {
        [JsonPropertyName("keystone_affix")]
        public Affix keystoneAffix { get; set; }
    }
}
