using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Interfaces;
using BlizzardWebApp.Server.Services;
using Microsoft.EntityFrameworkCore;
using Polly;

namespace BlizzardWebApp.Server.Extensions
{
    public static class ServicesExtension
    {


        public static void AddAppServices(this IServiceCollection Services)
        {
            Services.AddHttpClient("BlizzardApi", client =>
            {
                client.BaseAddress = new Uri("https://eu.api.blizzard.com");
            });
            Services.AddScoped<IDbService, DbService>();
            Services.AddScoped<IBlizzardApiService, BlizzardApiService>();
            Services.AddSingleton<IBlizzardAuthService, BlizzardAuthService>();
            Services.AddSingleton<ILoggingService, LoggingService>();
            Services.AddSingleton<IAsyncPolicy<HttpResponseMessage>>(sp =>
            {
                var logger = sp.GetRequiredService<ILoggingService>();

                return Policy
                .Handle<HttpRequestException>()
                .OrResult<HttpResponseMessage>(r => !r.IsSuccessStatusCode)
                .WaitAndRetryAsync(
                    3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)), (result, timespan, retryNo, context) =>
                    { logger.LogWarning($"Retry No{retryNo} due to {result.Exception?.Message ?? result.Result.StatusCode.ToString()}"); }
                );
            });
        }


        public static void AddDatabaseServices(this IServiceCollection Services)
        {
            Services.AddDbContext<LbDbContext>((sp, options) =>
            {
                var conf = sp.GetRequiredService<IConfiguration>();
                options.UseSqlite(conf.GetConnectionString("DefaultConnection"));
            });
        }




    }
}
