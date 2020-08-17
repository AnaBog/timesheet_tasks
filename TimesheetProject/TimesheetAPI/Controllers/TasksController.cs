using System;
using System.Web.Http;
using TimesheetApplication.Models;
using TimesheetApplication.Services;

namespace TimesheetApplication.Controllers
{
    public class TasksController : ApiController
    {
        private readonly ITimesheetService _timeSheetService;

        public TasksController()
        {

        }

        public TasksController(ITimesheetService timeSheetService)
        {
            _timeSheetService = timeSheetService;
        }
        [HttpGet]
        // GET: api/Tasks/id
        
        public IHttpActionResult Show(int id)
        {

            var resultData = _timeSheetService.Get(id);

            if (resultData == null)
            {
                return NotFound();
            }
            return Ok(resultData);
        }

        // GET: api/Tasks
        [HttpGet]
        public IHttpActionResult Index(DateTime date)
        {

            var resultData = _timeSheetService.GetAllTimesheetTasksForADate(date); 

            if (resultData == null)
            {
                return NotFound();
            }
            return Ok(resultData);
        }

        // POST: api/Tasks
        [HttpPost]
        public IHttpActionResult Create([FromBody]TimesheetTask timeSheetItem)
        {
            _timeSheetService.Add(timeSheetItem);
            return Created(new Uri("/api/Tasks/id", UriKind.Relative), timeSheetItem);
        }

        // PUT: api/Tasks

        public IHttpActionResult Put([FromBody]TimesheetTask timeSheetItem)
        {
            _timeSheetService.Update(timeSheetItem);

            return Created(new Uri("/api/Tasks", UriKind.Relative), timeSheetItem);
        }

        // DELETE: api/Tasks/5
        public void Delete(int Id)
        {
            _timeSheetService.Delete(Id);
        }
    }
}
