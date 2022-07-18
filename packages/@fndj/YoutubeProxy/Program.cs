var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<YoutubeExplode.YoutubeClient>();

builder.Services.Configure<RouteOptions>(options => {
    options.ConstraintMap.Add("streamType", typeof(YoutubeProxy.Controllers.StreamTypeConstraint));
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(p => p.WithMethods(HttpMethods.Get).AllowAnyOrigin().AllowAnyHeader());
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
