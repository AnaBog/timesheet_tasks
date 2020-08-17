using System.Web.Http;
using TimesheetApplication.Services;

namespace TimesheetApplication.Controllers
{
    public class QuotesController : ApiController
    {
        private readonly IQuoteService _quoteService;
        public QuotesController()
        {

        }

        public QuotesController(IQuoteService quoteService)
        {
            _quoteService = quoteService;
        }
        // GET: api/Quotes
        [HttpGet]
        public IHttpActionResult Get()
        {
            var resultData = _quoteService.GetRandomQuote(); 

            if (resultData == null)
            {
                return NotFound();
            }

            return Ok(resultData);
        }
    }
}
