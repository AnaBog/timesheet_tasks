using System;
using System.Collections.Generic;
using TimesheetApplication.Models;

namespace TimesheetApplication.Repositories
{
    public interface ITimesheetRepository: IGenericRepository<TimesheetTask>
    {
        IEnumerable<TimesheetTask> GetAllTimesheetTasksForADate(DateTime date);
        int GetTotalHoursForADate(DateTime date);
    }
}
