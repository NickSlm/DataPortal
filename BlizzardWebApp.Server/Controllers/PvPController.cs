using BlizzardWebApp.Server.Dto;
using BlizzardWebApp.Server.Dto.Response;
using BlizzardWebApp.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace BlizzardWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PvPController : ControllerBase
    {

        private readonly IBlizzardApiService _blizzardApi;

        public PvPController(IBlizzardApiService blizzardApi)
        {
            _blizzardApi = blizzardApi;

        }



        [HttpGet("/pvp/seasons/current")]
        public async Task<ActionResult<CurrentSeasonDto>> GetCurrentSeason()
        {
            var seasons = await _blizzardApi.GetCurrentPvPSeason();


            var dto = new CurrentSeasonDto
            {
                CurrentSeason = seasons.current_season,
                Seasons = seasons.seasons
            };
            return Ok(dto);
        }

        [HttpGet("/pvp/seasons/leaderboard/season/{season}/bracket/{bracket}")]
        public async Task<ActionResult<LeaderboardDto>> GetLeaderboard(int season, string bracket)
        {

            var leaderboard = await _blizzardApi.GetLeaderboard(season, bracket);

            var dto = new LeaderboardDto
            {
                Name = leaderboard.Name,
                Entries = leaderboard.Entries
            };
            return Ok(dto);
        }

        [HttpGet("/pvp/profile/character/{character}/realm/{realm}/get")]
        public async Task<ActionResult<CharacterProfileDto>> GetProfileData(string character, string realm)
        {
            var profileDto = await _blizzardApi.GetCharacterProfile(
                character.ToLower(), 
                realm.ToLower());
            return Ok(profileDto);
        }
    }
}
