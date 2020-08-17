using System;
using System.Collections.Generic;
using TimesheetApplication.Models;

namespace TimesheetApplication.Services
{
    public interface ITimesheetService
    {
        TimesheetTask Get(int Id);
        void Add(TimesheetTask timeSheetItem);
        void Delete(int Id);
        void Update(TimesheetTask timeSheetItem);
        IEnumerable<TimesheetTask> GetAllTimesheetTasksForADate(DateTime date);
    }
}
