using BlizzardWebApp.Server.Dto;
using BlizzardWebApp.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlizzardWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntriesController : ControllerBase
    {

        private readonly IDbService _dbService;

        public EntriesController(IDbService dbService)
        {
            _dbService = dbService;
        }


        [HttpGet("/Snapshot/Date/{date}")]
        public async Task<ActionResult<IEnumerable<LeaderboardEntryDto>>> GetEntries(DateTime date)
        {
            var entries = await _dbService.GetEntriesByDate(date);

            var dto = entries.Select(e => new LeaderboardEntryDto
            {
                CharacterName = e.CharacterName,
                Lost = e.Lost,
                Played = e.Played,
                Won = e.Won,
                Rating = e.Rating,
                Rank = e.Rank
            });

            return Ok(dto);

        }
    }
}
