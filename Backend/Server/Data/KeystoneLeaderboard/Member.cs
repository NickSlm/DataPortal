namespace BlizzardWebApp.Server.Data.KeystoneLeaderboard
{
    public class Member
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Realm { get; set; }
        public List<GroupMember> GroupMembers { get; set; }
    }
}
