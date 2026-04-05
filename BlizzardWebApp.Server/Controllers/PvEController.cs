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


        public PvEController(IDbService dbService)
        {
            _dbService = dbService;
        }


        [HttpGet("/connected_realms/get")]
        public async Task<ActionResult<ConnectedRealmDto>> Get()
        {
            var dto = await _dbService.GetRealms();

            return Ok(dto);
        }

    }
}
