namespace BlizzardWebApp.Server.Dto
{
    public class ConnectedRealmDto
    {
        public int Id { get; set; }
        public string MythicLeaderboard { get; set; }
        public string Auctions { get; set; }
        public List<RealmDto> Realms { get; set; }
    }
}
