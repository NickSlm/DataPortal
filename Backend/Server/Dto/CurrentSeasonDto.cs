using BlizzardWebApp.Server.Models;

namespace BlizzardWebApp.Server.Dto
{
    public class CurrentSeasonDto
    {

        public Season CurrentSeason { get; set; }
        public List<Season> Seasons { get; set; }
    }
}
