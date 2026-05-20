using BlizzardWebApp.Server.Data;
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
        Task<MythicLeaderboard> GetCurrentMythicLeaderboardsAsync(int realmId, int keystoneId);
        Task<Affix> GetAffixData(int affixId);
    }
}
