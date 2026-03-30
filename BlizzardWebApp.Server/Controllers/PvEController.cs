using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlizzardWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PvEController : ControllerBase
    {
        // GET: api/<PvEController>
        [HttpGet("/connected_realms/get")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

    }
}
