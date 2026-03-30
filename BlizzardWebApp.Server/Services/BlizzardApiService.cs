using BlizzardWebApp.Server.Interfaces;
using BlizzardWebApp.Server.Models;
using Polly;
using System.Net.Http.Headers;
using System.Text.Json;

namespace BlizzardWebApp.Server.Services
{
    public class BlizzardApiService: IBlizzardApiService
    {
        private readonly ICacheService _cacheService;
        private readonly IBlizzardAuthService _authService;
        private readonly IAsyncPolicy<HttpResponseMessage> _asyncPolicy;
        private readonly HttpClient _httpClient;

        public BlizzardApiService(IBlizzardAuthService authService, IAsyncPolicy<HttpResponseMessage> asyncPolicy, IHttpClientFactory httpClientFactory, ICacheService cacheService)
        {
            _authService = authService;
            _asyncPolicy = asyncPolicy;
            _httpClient = httpClientFactory.CreateClient("BlizzardApp");
            _cacheService = cacheService;
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

            using var request = new HttpRequestMessage(HttpMethod.Get, $"/data/wow/pvp-season/{season}/pvp-leaderboard/{bracket}?namespace=dynamic-eu&locale=en_US");

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _asyncPolicy.ExecuteAsync(() => _httpClient.SendAsync(request));
            var json = await response.Content.ReadAsStringAsync();

            var leaderboard = JsonSerializer.Deserialize<Leaderboard>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return leaderboard;

        }
    }
}
