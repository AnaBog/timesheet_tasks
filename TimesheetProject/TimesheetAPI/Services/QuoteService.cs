using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TimesheetApplication.Models;

namespace TimesheetApplication.Services
{
    public class QuoteService: IQuoteService
    {
        private readonly IQuoteReader _quoteReader;

        public QuoteService(IQuoteReader quoteReader)
        {
            _quoteReader = quoteReader;
        }

        public Quote GetRandomQuote()
        {
            List<Quote> quotes = _quoteReader.GetQuotes().ToList();
            Random r = new Random();
            Quote quote = quotes[r.Next(quotes.Count)];
            return quote;
        }
    }
}