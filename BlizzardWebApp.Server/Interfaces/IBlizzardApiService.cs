using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Models;

namespace BlizzardWebApp.Server.Interfaces
{
    public interface IBlizzardApiService
    {
        Task<Seasons> GetCurrentPvPSeason();
        Task<Leaderboard> GetLeaderboard(int season, string bracket);
        Task<List<ConnectedRealmData>> GetConnectedRealms();
        Task<List<MythicKeystoneDb>> GetMythicKeystones();
    }
}
