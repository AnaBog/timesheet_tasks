using System;
using System.Collections.Generic;
using System.Configuration;
using TimesheetApplication.Models;
using TimesheetApplication.Repositories;

namespace TimesheetApplication.Services
{
    public class TimesheetService: ITimesheetService
    {
        private readonly ITimesheetRepository _timeSheetRepository; 
        private readonly int _maximumHours;

        public TimesheetService(ITimesheetRepository timeSheetRepository) 
        {
            _timeSheetRepository = timeSheetRepository; 
            _maximumHours = Int32.Parse(ConfigurationManager.AppSettings["timeSheetMaxHours"]);
        }

        public TimesheetTask Get(int Id)
        {
            return _timeSheetRepository.Get(Id);
        }

        public void Add(TimesheetTask timeSheetTask)
        {
            // Contains business logic to check if number of hours is bigger then allowed maximum
           int totalHoursPerDay = _timeSheetRepository.GetTotalHoursForADate(timeSheetTask.DateCreated);
           if (totalHoursPerDay + timeSheetTask.Hours <= _maximumHours)
            {
                _timeSheetRepository.Add(timeSheetTask);
            }

            else
            {
                throw new System.ArgumentException("You have exceeded maximum number of hours per day", "Hours");
            }
        }

        public void Delete(int Id)
        {
            _timeSheetRepository.Delete(Id);
        }

        public void Update(TimesheetTask timeSheetTask)
        {
            int totalHoursPerDay = _timeSheetRepository.GetTotalHoursForADate(timeSheetTask.DateCreated);
            if (totalHoursPerDay + timeSheetTask.Hours <= _maximumHours)
            {
                _timeSheetRepository.Update(timeSheetTask);
            }
            else
            {
                throw new System.ArgumentException("You have exceeded maximum number of hours per day", "Hours");
            }
        }

        public IEnumerable<TimesheetTask> GetAllTimesheetTasksForADate(DateTime date)
        {
            return _timeSheetRepository.GetAllTimesheetTasksForADate(date);
        }
    }
}