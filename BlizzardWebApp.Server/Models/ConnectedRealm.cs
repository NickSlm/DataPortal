using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class ConnectedRealm
    {
        [JsonPropertyName("connected_realms")]
        public List<HRef> ConnectedRealms { get; set; }
    }
}
