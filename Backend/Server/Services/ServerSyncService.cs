using BlizzardWebApp.Server.Interfaces;

namespace BlizzardWebApp.Server.Services
{
    public class ServerSyncService: BackgroundService
    {
        private readonly ILoggingService _loggingService;
        private readonly IServiceScopeFactory _scopeFactory;

        public ServerSyncService(IServiceScopeFactory scopeFactory, ILoggingService loggingService)
        {
            _scopeFactory = scopeFactory;
            _loggingService = loggingService;
        }


        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            DateTime designatedTime = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, DateTime.UtcNow.Day, 7, 30, 00, DateTimeKind.Utc);

            while (!stoppingToken.IsCancellationRequested)
            {
                var delay = designatedTime - DateTime.UtcNow;

                if (delay < TimeSpan.Zero)
                {
                    delay = TimeSpan.Zero;
                }
                _loggingService.LogInfo($"Next server fetch scheduled at {designatedTime} UTC");

                await Task.Delay(delay, stoppingToken);

                int attempt = 0;

                while (attempt < 3)
                {
                    attempt++;


                    using var scope = _scopeFactory.CreateScope();
                    var dbService = scope.ServiceProvider.GetService<IDbService>();

                    try
                    {
                        await dbService.SaveConnectedRealms();
                        _loggingService.LogInfo($"Servers Fetched on {DateTime.UtcNow}");
                        break;
                    }
                    catch (TaskCanceledException)
                    {
                        break;
                    }
                    catch (Exception ex)
                    {
                        _loggingService.LogError(ex, $"Failed fetching servers, attempt:{attempt}");
                        await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
                    }
                }

                designatedTime = designatedTime.AddDays(1);

            }
        }

    }
}
