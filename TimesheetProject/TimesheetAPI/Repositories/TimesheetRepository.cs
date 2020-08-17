//using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using TimesheetApplication.Models;

namespace TimesheetApplication.Repositories
{
    public class TimesheetRepository: IGenericRepository<TimesheetTask>, ITimesheetRepository
    {
        static readonly string connectionString = ConfigurationManager.ConnectionStrings["connectionStr"].ConnectionString;

		public TimesheetTask Get(int Id)
		{
			TimesheetTask timeSheet = null;

			using (SqlConnection con = new SqlConnection(connectionString))
			{
				con.Open();
				
				using (SqlCommand command = new SqlCommand("SELECT * FROM timesheet WHERE id = @id", con))
				{
					command.Parameters.AddWithValue("@id", Id);
					using (SqlDataReader reader = command.ExecuteReader())
					{
						while (reader.Read())
						{
							timeSheet = new TimesheetTask
							{
								Id = Convert.ToInt32(reader.GetValue(0)),
								Title = reader.GetValue(1).ToString(),
								Hours = Convert.ToInt32(reader.GetValue(2)),
								DateCreated = Convert.ToDateTime(reader.GetDateTime(3).ToString("dd/MM/yyyy"))
							};
						}
					}
				}
			}

			return timeSheet;
		}

		public void Add(TimesheetTask timesheetTask)
		{

			using (SqlConnection con = new SqlConnection(connectionString))
			{
				con.Open();
				
				using (SqlCommand command = new SqlCommand("INSERT INTO timesheet (title, hours, created_at) Values (@Title, @Hours, @DateCreated); SELECT SCOPE_IDENTITY();", con))
				{
					command.Parameters.AddWithValue("@Title", timesheetTask.Title);
					command.Parameters.AddWithValue("@Hours", timesheetTask.Hours);
					command.Parameters.AddWithValue("@DateCreated", timesheetTask.DateCreated);
					timesheetTask.Id  = Convert.ToInt32(command.ExecuteScalar());
				}
			}
		}

		public void Delete(int Id)
		{

			using (SqlConnection con = new SqlConnection(connectionString))
			{
				con.Open();

				using (SqlCommand command = new SqlCommand("DELETE FROM timesheet WHERE id = @id", con))
				{
					command.Parameters.AddWithValue("@id", Id);
					command.ExecuteNonQuery();
				}
			}
		}
		public void Update(TimesheetTask timesheetTask)
		{
			using (SqlConnection con = new SqlConnection(connectionString))
			{
				con.Open();
				using (SqlCommand command = new SqlCommand("UPDATE timesheet SET title = @Title, hours = @Hours, created_at = @DateCreated WHERE id = @id", con))
				{
					command.Parameters.AddWithValue("@id", timesheetTask.Id);
					command.Parameters.AddWithValue("@Title", timesheetTask.Title);
					command.Parameters.AddWithValue("@Hours", timesheetTask.Hours);
					command.Parameters.AddWithValue("@DateCreated", timesheetTask.DateCreated);
					command.ExecuteNonQuery();
				}
			}
		}

		public IEnumerable<TimesheetTask> GetAllTimesheetTasksForADate(DateTime date)
		{
			List<TimesheetTask> tasks = new List<TimesheetTask>();

			using (SqlConnection con = new SqlConnection(connectionString))
			{
				con.Open();

				using (SqlCommand command = new SqlCommand("SELECT * FROM timesheet WHERE created_at = @DateCreated", con))
				{
					command.Parameters.AddWithValue("@DateCreated", date);
					using (SqlDataReader reader = command.ExecuteReader())
					{
						while (reader.Read())
						{
							TimesheetTask timeSheet = new TimesheetTask();
							timeSheet.Title = reader.GetValue(1).ToString();
							timeSheet.Hours = Convert.ToInt32(reader.GetValue(2));
							timeSheet.Id = Convert.ToInt32(reader.GetValue(0));
							timeSheet.DateCreated = Convert.ToDateTime(reader.GetDateTime(3).ToString("yyyy-MM-dd")); //dd/MM/yyyy

							tasks.Add(timeSheet);
						}
					}
				}
			}
			return tasks.AsEnumerable();
		}

		public int GetTotalHoursForADate(DateTime date)
		{
			int hours = 0;

			using (SqlConnection con = new SqlConnection(connectionString))
			{
				con.Open();

				using (SqlCommand command = new SqlCommand("SELECT SUM(hours) FROM timesheet WHERE created_at = @DateCreated", con))
				{
					command.Parameters.AddWithValue("@DateCreated", date);
					if (command.ExecuteScalar() != System.DBNull.Value)
					{
						hours = Convert.ToInt32(command.ExecuteScalar());
					}
					
				}
			}

			return hours;
		}
	} 
}