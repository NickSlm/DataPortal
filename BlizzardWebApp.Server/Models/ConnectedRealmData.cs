using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Models
{
    public class ConnectedRealmData
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("realms")]
        public List<RealmData> RealmData { get; set; } 
        [JsonPropertyName("mythic_leaderboards")]
        public HRef MLeaderboardHref { get; set; }
        [JsonPropertyName("auctions")]
        public HRef AuctionHref { get; set; }



}
}
