using Mangas.Infrastructure.Repositories;
using Mangas.Services.Features.Mangas;

var builder = WebApplication.CreateBuilder(args);

// Configura Kestrel en el código
builder.WebHost.ConfigureKestrel(options =>
{
    options.Listen(System.Net.IPAddress.Loopback, 5161); // Configura el puerto HTTP
    options.Listen(System.Net.IPAddress.Loopback, 7288, listenOptions =>
    {
        listenOptions.UseHttps(); // Configura el puerto HTTPS
    });
});

// Agrega los servicios al contenedor
builder.Services.AddScoped<MangaService>();
builder.Services.AddTransient<MangaRepository>();

builder.Services.AddControllers();
// Aprende más sobre la configuración de Swagger/OpenAPI en https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configura el pipeline de solicitudes HTTP
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Asegúrate de tener el directorio wwwroot si sirves archivos estáticos
app.UseRouting();
app.UseAuthorization();

// Mapea los controladores
app.MapControllers();

// Ejemplo de un endpoint simple
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

// Registro del WeatherForecast
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
