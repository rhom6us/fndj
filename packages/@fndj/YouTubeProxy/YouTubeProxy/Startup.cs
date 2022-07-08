using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.OData;
using Microsoft.AspNetCore.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OData.Edm;
using YoutubeExplode;
using YouTubeProxy.Data;
using YouTubeProxy.Models;
using YouTubeProxy.Platform;
using YouTubeProxy.Services;

namespace YouTubeProxy
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //    services.AddDbContext<YoutubeMediaContext>(options =>
            //        options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            //services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddControllers()
                .AddOData(opts => 
                    opts.Select().Filter().OrderBy().Count().SetMaxTop(10)
                    //.AddRouteComponents(GetEdmModel())
                )
                .AddJsonOptions(p =>  {
                    p.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;


                    p.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                    //p.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonTimeSpanConverter());
                    p.JsonSerializerOptions.Converters.Add(new JsonTimeSpanConverter
                    {
                        Format = JsonTimeSpanFormat.NumericMilliseconds,
                    });
                });
            //services.AddMvcCore(options =>
            //{
            //    options.EnableEndpointRouting = false;
            //});

            //services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Latest);
            //services.AddApiVersioning();
            
            
            services.Configure<RouteOptions>(options =>
            {
                options.ConstraintMap.Add("streamType", typeof(StreamTypeConstraint));
            });
            services.AddSingleton<YoutubeClient>();
            services.AddSingleton<YoutubeService>();
            // services.AddResponseCaching(options =>
            // {
            //     options.MaximumBodySize = 10 * 1024 * 1024;
            //     options.SizeLimit = options.MaximumBodySize * 100;
            //     options.UseCaseSensitivePaths = false;
            // });

            // In order to allow "Cross-Origin Embedder Policy"-enabled documents to load this resource, we require:
            //
            // Cross-Origin-Resource-Policy: same-site      =private resources
            // -or-
            // Cross-Origin-Resource-Policy: cross-origin   =public resources
            // -or-
            // Access-Control-Allow-*
            //
            services.AddCors(p => p
                .AddDefaultPolicy(builder => builder
                    .SetIsOriginAllowed(p => new System.Uri(p).Authority.Equals("localhost:9080", System.StringComparison.OrdinalIgnoreCase))
// .AllowAnyOrigin()
// .AllowAnyMethod()
                    .WithMethods("GET")
                    .AllowAnyHeader()
                )
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env/*, VersionedODataModelBuilder modelBuilder*/)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            //app.UseMvc(
            //    builder => {

            //        builder.Select().Expand().Filter().OrderBy().Count();
            //        //builder.MapVersionedODataRoutes("odata", "odata", modelBuilder.GetEdmModels());
            //        builder.MapVersionedODataRoute("odata", "odata", modelBuilder.GetEdmModels());
            //    });

            // app.UseAuthorization();

            app.UseCors();

            app.UseEndpoints(endpoints =>
            {

                endpoints.MapControllers();
                //endpoints.EnableDependencyInjection();
                //endpoints.Select().Filter().OrderBy().Count().MaxTop(10);
                ////endpoints.MapODataRoute("odata", "odata", GetEdmModel());
            });
        }
        //private static IEdmModel GetEdmModel()
        //{
        //    var odataBuilder = new Microsoft.OData.ModelBuilder.ODataConventionModelBuilder();
        //    odataBuilder.EntitySet<Track>("Tracks");

        //    return odataBuilder.GetEdmModel();
        //}
    }
}
