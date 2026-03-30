using Microsoft.EntityFrameworkCore;

namespace BlizzardWebApp.Server.Data
{
    [Index(nameof(Name))]

    public class Realm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Category { get; set; }


        public int CRealmsId { get; set; }
        public ConnectedRealms ConnectedRealm { get; set; }
    }
}
