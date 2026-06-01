namespace BlizzardWebApp.Server.Interfaces
{
    public interface IBlizzardAuthService
    {
        Task RefreshAccessTokenAsync();
        Task<string> GetAccessToken();
    }
}
