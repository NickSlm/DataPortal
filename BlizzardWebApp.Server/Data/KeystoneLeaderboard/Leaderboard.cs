namespace BlizzardWebApp.Server.Data.KeystoneLeaderboard
{
    public class Leaderboard
    {
        public int Id { get; set; }
        public int RealmId { get; set; }
        public int KeystoneId { get; set; }
        public List<Group> LeadingGroups { get; set; }
    }
}
