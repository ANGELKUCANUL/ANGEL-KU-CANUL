using Mangas.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Mangas.Services.Features.Mangas
{
    public class MangaService
    {
        private readonly List<Manga> _mangas = new List<Manga>();

        public IEnumerable<Manga> GetAll()
        {
            return _mangas;
        }

        public Manga GetById(int id)
        {
            return _mangas.FirstOrDefault(m => m.Id == id) ?? CreateDefaultManga();
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
            _mangas.Add(manga);
        }

        public void Update(Manga manga)
        {
            var existingManga = GetById(manga.Id);
            if (existingManga != null)
            {
                existingManga.Name = manga.Name;
                existingManga.Author = manga.Author;
                existingManga.Year = manga.Year;
            }
        }

        public void Delete(int id)
        {
            var manga = GetById(id);
            if (manga != null)
            {
                _mangas.Remove(manga);
            }
        }
    }
}
