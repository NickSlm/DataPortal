using BlizzardWebApp.Server.Interfaces;
using BlizzardWebApp.Server.Dto;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlizzardWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PvEController : ControllerBase
    {
        private readonly IDbService _dbService;

        public PvEController(IDbService dbService, ILoggingService logger)
        {
            _dbService = dbService;
        }


        [HttpGet("/connected_realms/get")]
        public async Task<ActionResult<ConnectedRealmDto>> GetConnectedRealms()
        {
            var dto = await _dbService.GetRealms();

            return Ok(dto);
        }


        [HttpPost("/leaderboard")]
        public async Task<ActionResult> GetLeaderboardById([FromBody] RealmDto request)
        {
            var id = request.Id;
            var name = request.Name;
            var category = request.Category;


            var res = await _dbService.SaveKeystonesData();


            return Ok(new { message = $"{name} {id} {res[0]}" });
        }


    }
}
