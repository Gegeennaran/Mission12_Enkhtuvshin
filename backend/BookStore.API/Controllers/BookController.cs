using BookStore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext bookContext)
        {
            _bookContext = bookContext;
        }

        [HttpGet]
        public IActionResult GetBooks(int pageMany = 5, int pageNum = 1, [FromQuery]List<string>? bookCats=null, string sortBy = "title", string sortOrder = "asc")
        {
            var query = _bookContext.Books.AsQueryable();
            
            if (bookCats != null && bookCats.Any())
            {
                query = query.Where(b => bookCats.Contains(b.Category));
            }
            
            if (sortBy == "title")
            {
                query = sortOrder == "asc" ? query.OrderBy(b => b.Title) : query.OrderByDescending(b => b.Title);
            }
            
            var result = query
                .Skip((pageNum-1)*pageMany)
                .Take(pageMany)
                .ToList();

            var totalBooks = query.Count();
            var someObj = new
            {
                Books = result,
                TotalBooks = totalBooks
            };
            return Ok(someObj);

        }

        [HttpGet("GetCategory")]
        public IActionResult GetCategory()
        {
           var bookCat= _bookContext.Books
               .Select(b=>b.Category)
               .Distinct()
               .ToList();
           return Ok(bookCat);
        }
    }
}
