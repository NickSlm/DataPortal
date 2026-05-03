using BlizzardWebApp.Server.Interfaces;
using BlizzardWebApp.Server.Dto;
using Microsoft.AspNetCore.Mvc;
using BlizzardWebApp.Server.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlizzardWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PvEController : ControllerBase
    {
        private readonly IDbService _dbService;
        private readonly IBlizzardApiService _blizzardApi;


        public PvEController(IDbService dbService, ILoggingService logger, IBlizzardApiService blizzardApi)
        {
            _dbService = dbService;
            _blizzardApi = blizzardApi;
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

            await _dbService.SaveKeystonesData();

            return Ok(new { message = $"{name}" });
        }

        [HttpGet("/MythicKeystones/get")]
        public async Task<ActionResult<MythicKeystoneDb>> GetMythicKeystones()
        {
            var keystones = await _dbService.GetKeystonesData();

            return Ok(keystones);
        }

        [HttpGet("/MythicKeystone/Leaderboard/connected-realm/{realmId}/mythic-leaderboard/{keystoneId}")]
        public async Task<ActionResult> GetMythicLeaderboard(int realmId, int keystoneId)
        {

            var keystoneLeaderboard = await _blizzardApi.GetCurrentMythicLeaderboardsAsync(realmId, keystoneId);

            return Ok(keystoneLeaderboard);

        }


    }
}
