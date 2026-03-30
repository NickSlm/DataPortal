using Microsoft.EntityFrameworkCore;

namespace BlizzardWebApp.Server.Data
{
    public class ConnectedRealms
    {
        public int Id { get; set; }
        public List<Realm> Realms { get; set; }
        public string MythicLeaderboard { get; set; }
        public string Auctions { get; set; }
    }
}
