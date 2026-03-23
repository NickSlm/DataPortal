using BlizzardWebApp.Server.Interfaces;
using NuGet.Protocol;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace BlizzardWebApp.Server.Services
{
    public class BlizzardAuthService: IBlizzardAuthService
    {

        private string _token;
        private DateTime _tokenExpiration;


        public async Task<string> GetAccessToken()
        {
            if (string.IsNullOrEmpty(_token) || DateTime.UtcNow >= _tokenExpiration)
            {
                await RefreshAccessTokenAsync();
            }

            return _token;
        }


        public async Task RefreshAccessTokenAsync()
        {
            // TODO: Encrypt using Windows Credentials Manager
            string clientId = "6eef8ac48dbc417197ed8a34c731e398";
            string clientSecret = "mxzBzxKXxQZsYU3ogGjPhoodi9O6VVmQ";


            using var httpClient = new HttpClient();

            var request = new HttpRequestMessage(HttpMethod.Post, "https://oauth.battle.net/token")
            {
                Content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("grant_type", "client_credentials")
                })
            };

            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes($"{clientId}:{clientSecret}")));


            var response = await httpClient.SendAsync(request);
            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);

            var token = doc.RootElement.GetProperty("access_token");
            var expiresIn = doc.RootElement.GetProperty("expires_in");

            _token = token.ToString();
            _tokenExpiration = DateTime.UtcNow.AddSeconds(expiresIn.GetInt32() - 60);


        }

    }
}
