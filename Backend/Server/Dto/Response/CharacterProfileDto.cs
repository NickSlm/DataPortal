using BlizzardWebApp.Server.Models;

namespace BlizzardWebApp.Server.Dto.Response
{
    public class CharacterProfileDto
    {
        public string Name { get; set; }
        public string Realm { get; set; }
        public string Avatar { get; set; }
        public BlizzardCharacterProfile Profile { get; set; }
    }
}
