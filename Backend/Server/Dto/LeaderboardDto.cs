using BlizzardWebApp.Server.Models;
using System.Text.Json.Serialization;

namespace BlizzardWebApp.Server.Dto
{
    public class LeaderboardDto
    {
        public string Name { get; set; }
        public List<Entry> Entries { get; set; }
    }
}
