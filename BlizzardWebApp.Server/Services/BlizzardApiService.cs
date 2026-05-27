using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Dto.Response;
using BlizzardWebApp.Server.Interfaces;
using BlizzardWebApp.Server.Models;
using BlizzardWebApp.Server.Models.MythicKeystones;
using Microsoft.CodeAnalysis.Elfie.Serialization;
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
            //:TODO testing DELETE LATER
            _logger.LogInfo("===========================================================================================================");
            _logger.LogInfo(token);
            _logger.LogInfo("===========================================================================================================");

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
        public async Task<List<MythicKeystoneDb>> GetMythicKeystones()
        {
            var token = await _authService.GetAccessToken();

            using var request = new HttpRequestMessage(HttpMethod.Get, $"/data/wow/connected-realm/509/mythic-leaderboard/?namespace=dynamic-eu");
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

            var tasks = keystones.MythicKeystones
            .Select(async k =>
            {
                await semaphore.WaitAsync();
                try
                {
                    return await GetDungeonData(k, token);
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
        private async Task<MythicKeystoneDb> GetDungeonData(BlizzardKNI key, string token)
        {
            using var request = new HttpRequestMessage(HttpMethod.Get, $"/data/wow/mythic-keystone/dungeon/{key.Id}?namespace=dynamic-eu&locale=en_US");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _asyncPolicy.ExecuteAsync(() => _httpClient.SendAsync(request));
            var json = await response.Content.ReadAsStringAsync();

            var dungeon = JsonSerializer.Deserialize<Dungeon>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReadCommentHandling = JsonCommentHandling.Skip,
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
            });


            var keystoneData = new MythicKeystoneDb
            {
                Id = key.Id,
                Name = dungeon.Name,
                DungeonId = dungeon.Info.Id,
                ImagePath = $"/src/Assets/Dungeon/dungeon_{dungeon.Name}.jpg"
            };
            var downloadPath = $"../blizzardwebapp.client/src/Assets/Dungeon/dungeon_{dungeon.Name}.jpg";

            await DownloadDungeonAsset(keystoneData.DungeonId, token, downloadPath);

            return keystoneData;
        }
        public async Task<Affix> GetAffixData(int affixId)
        {
            var token = await _authService.GetAccessToken();

            using var request = new HttpRequestMessage(HttpMethod.Get, $"/data/wow/keystone-affix/{affixId}?namespace=static-eu&locale=en_US");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _asyncPolicy.ExecuteAsync(() => _httpClient.SendAsync(request));
            var json = await response.Content.ReadAsStringAsync();

            var affixData = JsonSerializer.Deserialize<Affix>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReadCommentHandling = JsonCommentHandling.Skip,
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
            });

            return affixData;
        }
        public async Task<CharacterProfileDto> GetCharacterProfile(string character, string realm)
        {
            var token = await _authService.GetAccessToken();

            var response = await _asyncPolicy.ExecuteAsync(async () =>
            {
                using var request = new HttpRequestMessage(
                HttpMethod.Get,
                    $"/profile/wow/character/{realm}/{character}?namespace=profile-eu");

                request.Headers.Authorization =
                    new AuthenticationHeaderValue("Bearer", token);

                return await _httpClient.SendAsync(request);
            });
            var json = await response.Content.ReadAsStringAsync();

            var summary = JsonSerializer.Deserialize<BlizzardCharacterProfile>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReadCommentHandling = JsonCommentHandling.Skip,
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
            });
            var avatar = await GetCharacterAssets(token, character, realm);

            var profileDto = new CharacterProfileDto
            {
                Avatar = avatar,
                Name = character,
                Realm = realm,
                Profile = summary
            };
            return profileDto;

        }
        public async Task<BlizzardLoadout> GetCharacterLoadouts(string character, string realm, string activeSpec)
        {
            var token = await _authService.GetAccessToken();

            Console.WriteLine($"{activeSpec}+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

            var response = await _asyncPolicy.ExecuteAsync(async () =>
            {
                using var request = new HttpRequestMessage(
                HttpMethod.Get,
                    $"/profile/wow/character/{realm}/{character}/specializations?namespace=profile-eu");

                request.Headers.Authorization =
                    new AuthenticationHeaderValue("Bearer", token);

                return await _httpClient.SendAsync(request);
            });
            var json = await response.Content.ReadAsStringAsync();

            var data = JsonSerializer.Deserialize<BlizzardSpecializations>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReadCommentHandling = JsonCommentHandling.Skip,
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
            });

            foreach (var spec in data.Specializations)
            {
                foreach(var loadout in spec.Loadouts)
                {
                    if (loadout.IsActive && loadout.SelectedSpec.Name["en_US"] == activeSpec)
                    {
                        return loadout;
                    }
                }
            }
            return null;
        }
        public async Task<string> GetCharacterAssets(string token, string character, string realm)
        {
            var response = await _asyncPolicy.ExecuteAsync(async () =>
            {
                using var request = new HttpRequestMessage(
                    HttpMethod.Get,
                    $"/profile/wow/character/{realm}/{character}/character-media?namespace=profile-eu");

                request.Headers.Authorization =
                    new AuthenticationHeaderValue("Bearer", token);

                return await _httpClient.SendAsync(request);
            });
            var json = await response.Content.ReadAsStringAsync();

            var CharacterMedia = JsonSerializer.Deserialize<BlizzardCharacterMedia>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReadCommentHandling = JsonCommentHandling.Skip,
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
            });

            if (CharacterMedia == null)
            {
                return "PlaceHolder";
            }

            var avatar = CharacterMedia.Assets[0].Value;
            var inset = CharacterMedia.Assets[1].Value;
            var raw = CharacterMedia.Assets[2].Value;

            return avatar;
        }
        private async Task DownloadDungeonAsset(int dungeonId, string token, string path)
        {
            using var request = new HttpRequestMessage(HttpMethod.Get, $"/data/wow/media/journal-instance/{dungeonId}?namespace=static-12.0.1_65617-eu");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _asyncPolicy.ExecuteAsync(() => _httpClient.SendAsync(request));
            var json = await response.Content.ReadAsStringAsync();

            var asset = JsonSerializer.Deserialize<DungeonAsset>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReadCommentHandling = JsonCommentHandling.Skip,
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
            });

            var imageUrl = asset.Assets.FirstOrDefault(a => a.Key == "tile")?.Value;
            await ImageDownloaderService.SaveImageAsync(path, imageUrl);
        }
        public async Task<MythicLeaderboard> GetCurrentMythicLeaderboardsAsync(int realmId, int keystoneId)
        {
            var token = await _authService.GetAccessToken();

            using var request = new HttpRequestMessage(HttpMethod.Get, $"/data/wow/connected-realm/{realmId}/mythic-leaderboard/{keystoneId}/period/1061?namespace=dynamic-eu");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _asyncPolicy.ExecuteAsync(() => _httpClient.SendAsync(request));
            var json = await response.Content.ReadAsStringAsync();

            var mythicLeaderboard = JsonSerializer.Deserialize<MythicLeaderboard>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                ReadCommentHandling = JsonCommentHandling.Skip,
                Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
            });

            mythicLeaderboard.LeaderboardId = $"{realmId}-{keystoneId}";

            return mythicLeaderboard;
        }
    }
}
