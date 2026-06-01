using Microsoft.EntityFrameworkCore;

namespace BlizzardWebApp.Server.Data
{
    [Index(nameof(Name))]

    public class RealmDb
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Category { get; set; }


        public int CRealmsId { get; set; }
        public ConnectedRealmsDb ConnectedRealm { get; set; }
    }
}
