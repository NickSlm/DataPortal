using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Dto.Response;
using BlizzardWebApp.Server.Models;
using BlizzardWebApp.Server.Models.MythicKeystones;

namespace BlizzardWebApp.Server.Interfaces
{
    public interface IBlizzardApiService
    {
        Task<Seasons> GetCurrentPvPSeason();
        Task<Leaderboard> GetLeaderboard(int season, string bracket);
        Task<List<ConnectedRealmData>> GetConnectedRealms();
        Task<List<MythicKeystoneDb>> GetMythicKeystones();
        Task<CharacterProfileDto> GetCharacterProfile(string character, string realm);
        Task<string> GetCharacterAssets(string token, string character, string realm);
        Task<MythicLeaderboard> GetCurrentMythicLeaderboardsAsync(int realmId, int keystoneId);
        Task<Affix> GetAffixData(int affixId);
    }
}
