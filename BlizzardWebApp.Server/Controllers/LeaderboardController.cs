using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Dto;
using BlizzardWebApp.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlizzardWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaderboardController : ControllerBase
    {
        private IDbService _dbService;
        public LeaderboardController(IDbService dbService)
        {
            _dbService = dbService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaderboardSnapshotDto>>> GetSnapshots()
        {
            var snapshots = await _dbService.ListSnapshots();

            var dto = snapshots.Select(s => new LeaderboardSnapshotDto
            {
                DatePulled = s.DatePulled,
                Id = s.Id
            });

            return Ok(dto);
        }        
    }
}
