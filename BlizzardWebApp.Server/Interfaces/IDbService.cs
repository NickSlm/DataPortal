using BlizzardWebApp.Server.Data;

namespace BlizzardWebApp.Server.Interfaces
{
    public interface IDbService
    {
        Task<List<LeaderboardSnapshot>> ListSnapshots();

    }
}
