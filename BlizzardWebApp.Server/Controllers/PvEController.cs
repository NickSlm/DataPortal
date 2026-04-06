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



        //https://eu.api.blizzard.com/data/wow/connected-realm/{connected_realm_id}/mythic-leaderboard/?namespace=dynamic-eu

        //https://eu.api.blizzard.com/data/wow/mythic-keystone/dungeon/{keystone_id}?namespace=dynamic-eu&locale=en_US

        //https://eu.api.blizzard.com/data/wow/journal-instance/{dungeon_id}?namespace=static-12.0.1_65617-eu

        //https://render.worldofwarcraft.com/eu/zones/algethar-academy-small.jpg

            return Ok(new { message = $"{name} {id} {category}" });
        }


    }
}
