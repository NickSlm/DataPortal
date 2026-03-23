using BlizzardWebApp.Server.Data;
using BlizzardWebApp.Server.Interfaces;
using BlizzardWebApp.Server.Services;
using Microsoft.EntityFrameworkCore;

namespace BlizzardWebApp.Server.Extensions
{
    public static class ServicesExtension
    {


        public static void AddAppServices(this IServiceCollection Services)
        {
            Services.AddScoped<IDbService, DbService>();
            Services.AddSingleton<IBlizzardAuthService, BlizzardAuthService>();
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
