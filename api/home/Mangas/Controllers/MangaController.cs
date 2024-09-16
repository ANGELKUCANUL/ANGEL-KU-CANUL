using Mangas.Domain.Entities;
using Mangas.Services.Features.Mangas;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Mangas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MangaController : ControllerBase
    {
        private readonly MangaService _mangaService;

        public MangaController(MangaService mangaService)
        {
            _mangaService = mangaService;
        }

        [HttpGet]
        public IEnumerable<Manga> GetAll()
        {
            return _mangaService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Manga> GetById(int id)
        {
            var manga = _mangaService.GetById(id);
            if (manga == null)
            {
                return NotFound();
            }
            return Ok(manga);
        }

        [HttpPost]
        public ActionResult Add(Manga manga)
        {
            _mangaService.Add(manga);
            return CreatedAtAction(nameof(GetById), new { id = manga.Id }, manga);
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, Manga manga)
        {
            if (id != manga.Id)
            {
                return BadRequest();
            }

            var existingManga = _mangaService.GetById(id);
            if (existingManga == null)
            {
                return NotFound();
            }

            _mangaService.Update(manga);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var manga = _mangaService.GetById(id);
            if (manga == null)
            {
                return NotFound();
            }

            _mangaService.Delete(id);
            return NoContent();
        }
    }
}
