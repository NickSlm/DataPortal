using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Dto;
using BlizzardWebApp.Server.Models.MythicKeystones;

namespace BlizzardWebApp.Server.Interfaces
{
    public interface IDbService
    {
        Task<List<LeaderboardSnapshot>> ListSnapshots();
        Task<List<LeaderboardEntry>> GetEntriesByDate(DateTime dateTime);
        Task SaveConnectedRealms();
        Task<List<ConnectedRealmDto>> GetRealms();
        Task<PaginatedResultDto<KeystoneGroupDto>> GetKeystoneLeaderboard(int realmId, int keystoneId, int page);
        Task SaveKeystonesData();
        Task<List<MythicKeystoneDb>> GetKeystonesData();
        Task SaveKeystoneLeaderboardAsync();
        Task SaveAffixData();
    }
}
