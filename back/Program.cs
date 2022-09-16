using Adote.Library.BusinessContexts;
using AdoteWebApplication;
using AdoteWebApplication.Configs;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMvc().AddJsonOptions(options =>
    options.JsonSerializerOptions.Converters.Add(new CustomGuidConverter()));

builder.Services.AddDbContext<AdoteContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("AdoteContext")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true)
                    .AllowCredentials());

}
else
    app.UseHttpsRedirection();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AdoteContext>();
    context.Database.EnsureCreated();
    DbInitializer.Initialize(context);
}

app.UseAuthorization();

app.MapControllers();

app.Run();
