namespace BlizzardWebApp.Server.Dto
{
    public class KeystoneGroupDto
    {
        public int Ranking { get; set; }
        public int Duration { get; set; }
        public int KeystoneLevel { get; set; }
        public List<Dictionary<string, string>> GroupMembers { get; set; }
    }
}
