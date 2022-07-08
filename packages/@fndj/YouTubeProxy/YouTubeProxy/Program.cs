using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using YouTubeProxy.Data;
using YouTubeProxy.Models;

namespace YouTubeProxy
{
    public class Program
    {
        public static void Main(string[] args) {
            var host = CreateHostBuilder(args).Build();
            //CreateDbIfNotExists(host);
            host.Run();
        }

        //private static void CreateDbIfNotExists(IHost host) {
        //    using var scope = host.Services.CreateScope();
        //    var services = scope.ServiceProvider;
        //    try {
        //        services.GetRequiredService<YoutubeMediaContext>().Initialize();
        //    }
        //    catch (Exception ex) {
        //        var logger = services.GetRequiredService<ILogger<Program>>();
        //        logger.LogError(ex, "An error occurred creating the DB.");
        //    }
        //}

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();//.UseContentRoot(Environment.CurrentDirectory/* new FileInfo(Assembly.GetExecutingAssembly().Location).DirectoryName*/);
                });
    }
}
