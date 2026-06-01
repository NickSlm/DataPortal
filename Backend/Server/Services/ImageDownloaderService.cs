namespace BlizzardWebApp.Server.Services
{
    public class ImageDownloaderService
    {
        private static readonly HttpClient _httpClient = new HttpClient();

        public static async Task SaveImageAsync(string path, string imageUrl)
        {
            if (!File.Exists(path))
            {
                byte[] imageBytes = await _httpClient.GetByteArrayAsync(imageUrl);
                await File.WriteAllBytesAsync(path, imageBytes);
            }
        }
    }
}
