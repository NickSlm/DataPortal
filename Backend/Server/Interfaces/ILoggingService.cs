namespace BlizzardWebApp.Server.Interfaces
{
    public interface ILoggingService
    {
        void LogInfo(string message);
        void LogWarning(string message);
        void LogError(Exception ex, string message);

    }
}
