using System.Text.Json;
using Mangas.Domain.Entities;

namespace Mangas.Infrastructure.Repositories
{
    public class MangaRepository
    {
        private List<Manga> _mangas;
        private readonly string _filePath;

        public MangaRepository(IConfiguration configuration)
        {
            _filePath = configuration.GetValue<string>("dataBank") ?? "data.json";
            _mangas = LoadData();
        }

        private string GetCurrentFilePath()
        {
            var currentDirectory = Directory.GetCurrentDirectory();
            var currentFilePath = Path.Combine(currentDirectory, _filePath);
            return currentFilePath;
        }

        private List<Manga> LoadData()
        {
            var currentFilePath = GetCurrentFilePath();

            if (File.Exists(currentFilePath))
            {
                try
                {
                    var jsonData = File.ReadAllText(currentFilePath);
                    return JsonSerializer.Deserialize<List<Manga>>(jsonData) ?? new List<Manga>();
                }
                catch (JsonException)
                {
                    return new List<Manga>();
                }
                catch (IOException ex)
                {
                    Console.WriteLine($"Error al leer el archivo: {ex.Message}");
                    return new List<Manga>();
                }
            }

            return new List<Manga>();
        }

        public Manga GetById(int id)
        {
            return _mangas.FirstOrDefault(manga => manga.Id == id) ?? CreateDefaultManga();
        }

        private static Manga CreateDefaultManga()
        {
            return new Manga
            {
                Name = string.Empty,
                Author = string.Empty
            };
        }

        public void Add(Manga manga)
        {
            var currentFilePath = GetCurrentFilePath();
            try
            {
                if (!File.Exists(currentFilePath))
                {
                    File.WriteAllText(currentFilePath, "[]");
                }

                _mangas.Add(manga);
                SaveData();
            }
            catch (IOException ex)
            {
                Console.WriteLine($"Error al escribir el archivo: {ex.Message}");
            }
        }

        public void Update(Manga updatedManga)
        {
            var currentFilePath = GetCurrentFilePath();
            try
            {
                if (!File.Exists(currentFilePath))
                {
                    File.WriteAllText(currentFilePath, "[]");
                }

                var index = _mangas.FindIndex(m => m.Id == updatedManga.Id);

                if (index != -1)
                {
                    _mangas[index] = updatedManga;
                    SaveData();
                }
            }
            catch (IOException ex)
            {
                Console.WriteLine($"Error al escribir el archivo: {ex.Message}");
            }
        }

        public void Delete(int id)
        {
            var currentFilePath = GetCurrentFilePath();
            try
            {
                if (!File.Exists(currentFilePath))
                {
                    File.WriteAllText(currentFilePath, "[]");
                }

                _mangas.RemoveAll(m => m.Id == id);
                SaveData();
            }
            catch (IOException ex)
            {
                Console.WriteLine($"Error al escribir el archivo: {ex.Message}");
            }
        }

        private void SaveData()
        {
            var currentFilePath = GetCurrentFilePath();
            try
            {
                File.WriteAllText(currentFilePath, JsonSerializer.Serialize(_mangas));
            }
            catch (IOException ex)
            {
                Console.WriteLine($"Error al escribir el archivo: {ex.Message}");
            }
        }
    }
}
