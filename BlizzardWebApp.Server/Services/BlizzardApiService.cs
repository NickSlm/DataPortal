using BlizzardWebApp.Server.Interfaces;
using BlizzardWebApp.Server.Models;
using Polly;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BlizzardWebApp.Server.Services
{
    public class BlizzardApiService: IBlizzardApiService
    {
        private readonly ICacheService _cacheService;
        private readonly IBlizzardAuthService _authService;
        private readonly IAsyncPolicy<HttpResponseMessage> _asyncPolicy;
        private readonly HttpClient _httpClient;
        private ILoggingService _logger;

        public BlizzardApiService(IBlizzardAuthService authService, IAsyncPolicy<HttpResponseMessage> asyncPolicy, IHttpClientFactory httpClientFactory, ICacheService cacheService, ILoggingService logger)
        {
            _authService = authService;
            _asyncPolicy = asyncPolicy;
            _httpClient = httpClientFactory.CreateClient("BlizzardApp");
            _cacheService = cacheService;
            _logger = logger;
        }



        public async Task<Seasons> GetCurrentPvPSeason()
        {
            var cacheKey = "seasonList";

            var cache = await _cacheService.GetStringAsync(cacheKey);
            if (cache != null)
            {
                var cachedList = JsonSerializer.Deserialize<Seasons>(cache,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                return cachedList;
            }

            var token = await _authService.GetAccessToken();

            using var request = new HttpRequestMessage(HttpMethod.Get, "/data/wow/pvp-season/index?namespace=dynamic-eu&locale=en_US");

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await _asyncPolicy.ExecuteAsync(() => _httpClient.SendAsync(request));

            var json = await response.Content.ReadAsStringAsync();

            await _cacheService.SetAsync(cacheKey, json, TimeSpan.FromMinutes(30));

            var seasons = JsonSerializer.Deserialize<Seasons>(json,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return seasons;
        }
        public async Task<Leaderboard> GetLeaderboard(int season, string bracket)
        {

            var token = await _authService.GetAccessToken();
            //for testing DELETE LATER
            _logger.LogInfo(token);

            using var request = new HttpRequestMessage(HttpMethod.Get, $"/data/wow/pvp-season/{season}/pvp-leaderboard/{bracket}?namespace=dynamic-eu&locale=en_US");

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _asyncPolicy.ExecuteAsync(() => _httpClient.SendAsync(request));
            var json = await response.Content.ReadAsStringAsync();

            var leaderboard = JsonSerializer.Deserialize<Leaderboard>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return leaderboard;

        }
        public async Task<List<ConnectedRealmData>> GetConnectedRealms()
        {
            var token = await _authService.GetAccessToken();

            using var request = new HttpRequestMessage(HttpMethod.Get, $"/data/wow/connected-realm/index?namespace=dynamic-eu&locale=en_US");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _asyncPolicy.ExecuteAsync(() => _httpClient.SendAsync(request));
            var json = await response.Content.ReadAsStringAsync();

            var connectedRealms = JsonSerializer.Deserialize<ConnectedRealm>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReadCommentHandling = JsonCommentHandling.Skip,
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
            });

            var semaphore = new SemaphoreSlim(5);


            var tasks = connectedRealms.ConnectedRealms
                .Select(async href =>
                {
                    await semaphore.WaitAsync();
                    try
                    {
                        return await GetConnectedRealmById(href, token);
                    }
                    finally
                    {
                        semaphore.Release();
                    }
                })
                .ToList();


            var results = await Task.WhenAll(tasks);

            return results.ToList();
        }

        private async Task<ConnectedRealmData> GetConnectedRealmById(HRef href, string token)
        {

            using var request = new HttpRequestMessage(HttpMethod.Get, $"{href.Href}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _asyncPolicy.ExecuteAsync(() => _httpClient.SendAsync(request));
            var json = await response.Content.ReadAsStringAsync();

            var connectedRealmData = JsonSerializer.Deserialize<ConnectedRealmData>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReadCommentHandling = JsonCommentHandling.Skip,
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
            });

            return connectedRealmData;


        }

        public async Task GetMythicKeystones(int id)
        {
            var token = await _authService.GetAccessToken();

            using var request = new HttpRequestMessage(HttpMethod.Get, $"/data/wow/connected-realm/{id}/mythic-leaderboard/?namespace=dynamic-eu");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _asyncPolicy.ExecuteAsync(() => _httpClient.SendAsync(request));
            var json = await response.Content.ReadAsStringAsync();

            var keystones = JsonSerializer.Deserialize<MythicLeaderboards>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReadCommentHandling = JsonCommentHandling.Skip,
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
            });

            var semaphore = new SemaphoreSlim(5);

        }
    }
}
