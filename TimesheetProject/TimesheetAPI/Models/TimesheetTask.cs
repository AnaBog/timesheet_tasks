using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TimesheetApplication.Models
{
    public class TimesheetTask
    {
        public string Title { get; set; }
        
        public int Hours { get; set; }
        
        public int Id { get; set; }

        public DateTime DateCreated { get; set; }
    }
}