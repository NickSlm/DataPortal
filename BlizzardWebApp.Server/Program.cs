using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Extensions;
using Microsoft.EntityFrameworkCore;

namespace BlizzardWebApp.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAppServices();
            builder.Services.AddControllers();
            builder.Services.AddHostedServices();
            builder.Services.AddDatabaseServices();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReact", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var laderboardDatabase = scope.ServiceProvider.GetRequiredService<LbDbContext>();
                laderboardDatabase.Database.Migrate();
            }



            app.UseCors("AllowReact");
            app.UseDefaultFiles();
            app.UseStaticFiles();


            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
