
using System.Collections.Generic;
using System.IO;
using TimesheetApplication.Models;
using System.Text.Json;
using System.Web;

namespace TimesheetApplication.Services
{
    public class QuoteReader: IQuoteReader
    {
        public IEnumerable<Quote> GetQuotes()
        {
            string path = HttpContext.Current.Server.MapPath("~/Content/quotes.json");
            string jsonString = File.ReadAllText(Path.GetFullPath(path));
            List<Quote> quotes = JsonSerializer.Deserialize<List<Quote>>(jsonString);
            return quotes;
        }
    }
}