using System.Collections.Generic;
using TimesheetApplication.Models;

namespace TimesheetApplication.Services
{
    public interface IQuoteReader
    {
        IEnumerable<Quote> GetQuotes();
    }
}
