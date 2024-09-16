namespace Mangas.Domain.Entities
{
    public class Manga
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Author { get; set; }
        public int Year { get; set; }
        public string? Title { get; internal set; }
    }
}
