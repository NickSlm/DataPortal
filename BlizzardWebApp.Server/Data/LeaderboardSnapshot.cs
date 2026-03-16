namespace BlizzardWebApp.Server.Data
{
    public class LeaderboardSnapshot
    {

        public int Id { get; set; }
        public DateTime DatePulled { get; set; }
        public string Name { get; set; }
        public List<LeaderboardEntry> Entries { get; set; }

    }
}
