using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Dto;

namespace BlizzardWebApp.Server.Interfaces
{
    public interface IDbService
    {
        Task<List<LeaderboardSnapshot>> ListSnapshots();
        Task<List<LeaderboardEntry>> GetEntriesByDate(DateTime dateTime);
        Task SaveConnectedRealms();
        Task<List<ConnectedRealmDto>> GetRealms();
        Task SaveKeystonesData();

    }
}
