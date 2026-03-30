using Microsoft.EntityFrameworkCore;

namespace BlizzardWebApp.Server.Data
{
    public class ConnectedRealmsDb
    {
        public int Id { get; set; }
        public List<RealmDb> Realms { get; set; }
        public string MythicLeaderboard { get; set; }
        public string Auctions { get; set; }
    }
}
