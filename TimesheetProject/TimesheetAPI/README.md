## What is Web API?

Web API is a framework that is used to make HTTP services. As you know, now-a-days, we are using mobiles, tablets, apps, and different types of services, so Web API is a simple and reliable platform to create HTTP enabled services that can reach wide range of clients. It is used to create complete REST services. 

## Why REST, compared to RPC?

- RPC - Remote Procedure Call - you expose operations to manipulate data through HTTP as a transport protocol. The endpoint contains the name of the operation you want to invoke.
- REST - The resource request style - you expose data as resources that you manipulate through HTTP protocol using the right HTTP verb. The endpoint contains the resource you manipulate.

Here is a great [article](https://apihandyman.io/do-you-really-know-why-you-prefer-rest-over-rpc/) that compares those two request styles.

## 3-Tier Architecture
By looking at the below diagram, you can easily identify that 3-tier architecture has three different layers.

- Presentation layer
- Business Logic layer
- Database layer

![3 Layer Architecture Diagram](/images/3Layer.png)

## What is Repository Pattern?

[Repository Pattern](https://codewithshadman.com/repository-pattern-csharp/) is used to create an abstraction layer between Data Access Layer and Business Logic Layer of an application. Repository directly communicates with data access layer [DAL] and gets the data and provides it to the business logic layer [BAL]. The main advantage to use repository pattern is to isolate the data access logic and business logic, so that if you make changes in any of this logic it can't effect directly on other logic. For more information, please go through the [Repository Pattern Article](http://www.dotnet-tutorial.com/articles/mvc/how-to-use-repository-pattern-with-asp-net-mvc-with-entity-framework).


## Three-Layer Architecture Vs Repository Pattern

Three-Layer Architecture and the repository pattern are not contradictory. 
They really have nothing to do with each other, in fact. 3-Layer is just a philosophy that your application should be built in layers. 
It's essentially about modularization. 

The repository pattern is about abstraction, namely abstracting SQL queries from application code. 
You can very well do both in the same application.

**NOTE**
Repository pattern predates ORMs and there's a strong argument to be made it's redundant with an ORM. 
With Entity Framework, for example, the DbContext is your unit of work, and each DbSet is a repository.

Since we are not using ORM, or DbSet, we are using simple ADO.net library, we will use Repository pattern in this example.

## Dependency Injection (DI)

Dependency Injection (DI) is a type of [IoC](https://en.wikipedia.org/wiki/Inversion_of_control), it is a pattern where objects are not responsible for creating their own dependencies. Dependency injection is a way to remove hard-coded dependencies among objects, making it easier to replace an object's dependencies, either for testing (using mock objects in unit test) or to change run-time behaviour.

Before understanding Dependency Injection, you should be familiar with the two concepts of Object Oriented Programming, one is tight coupling and another is loose coupling, so let's see each one by one.

- **Tight Coupling**: When a class is dependent on a concrete dependency, it is said to be tightly coupled to that class. A tightly coupled object is dependent on another object; that means changing one object in a tightly coupled application often requires changes to a number of other objects. It is not difficult when an application is small but in an enterprise level application, it is too difficult to make the changes.

- **Loose Coupling**: It means two objects are independent and an object can use another object without being dependent on it. It is a design goal that seeks to reduce the inter-dependencies among components of a system with the goal of reducing the risk that changes in one component will require changes in any other component.

Now in short, Dependency Injection is a pattern that makes objects loosely coupled instead of tightly coupled. Generally we create a concrete class object in the class we require the object and bind it in the dependent class but DI is a pattern where we create a concrete class object outside this high-level module or dependent class.

There are three types of dependency injections:

- Constructor Dependency Injection
- Setter Dependency Injection
- Interface Dependency Injection

We will use Constructor Dependency Injection. This is the most commonly used Dependency Injection Pattern in Object Oriented Programming. The Constructor Dependency Injection uses a parameter to inject dependencies so there is normally one parameterized constructor always. So in this constructor dependency, the object has no default constructor and you need to pass specified values at the time of creation to initiate the object. You can say that your design is loosely coupled with the use of constructor dependency injection.

## Dependency Injection (DI) Container

The Dependency Injection Container is a framework to create dependencies and inject them automatically when required. It automatically creates objects based on requests and injects them when required. It helps us split our application into a collection of loosely-coupled, highly-cohesive pieces and then glue them back together in a flexible manner. By DI container, our code will become easier to write, reuse, test and modify. In this article we will use a Niject DI Container

## Web API Project 

Now, it is time for a  practical example of how to implement Repository Pattern with Web API Project. 

Create a solution named "TimeSheetWebAPI" and make the following folders for differnet activities.

- Entities - This will contain all the entity class files.
- Repositories - This will include Generic and Custom Repositories.
- Services - It includes all the business logic related classes.

### Entities

Create entity classes named as `TimeSheetItem` inside the Entities folder

```c#
public class TimeSheetItem  
{  
       public int TimeSheetItemId { get; set; }  
       public string Name { get; set; }  
       public int Hours { get; set; } 
       public DateTime CreatedAt { get; set; }
}
```

### Repositories

Now, it is time to create repositories. So, first, we will create a IGenericRepository which will include all the common methods which can be used for CRUD operations like Add, Delete, and Update etc.

Note: Best practice: We are working with Repository to create an Interface and implement it with class for removing complexity and making methods reusable.

```c#
public interface IGenericRepository<TEntity> where TEntity : class  
{  
        TEntity Get(int Id);  
        IEnumerable<TEntity> GetAll();  
        void Add(TEntity entity);  
        void Delete(TEntity entity);  
        void Update(TEntity entity);  
} 
```

We are going to create another repository interface called ITimeSheetRepository, which will include custom methods specific for TimeSheetItem, like GetAllTimeSheetItemsForADate and GetTotalHoursForADate

```c#
public interface ITimeSheetRepository
{  
    <IEnumerable<TimeSheetItem>> GetAllTimeSheetItemsForADate(DateTime date)
    int GetTotalHoursForADate(DateTime date)
} 
```


Create a new repository class named "TimeSheetRepository" which implements IGenericRepository and ITimeSheetRepository. 
Here we will implement all common methods from GenericRepository and specific ones from TimeSheetRepository.

In this example we will implement CRUD operations using ADO.NET library, but we could also implement TimeSheetSessionRepository instead.

```c#
public class TimeSheetRepository :IGenericRepository<TimeSheetItem>, ITimeSheetRepository  
{  
       public TimeSheetItem Get(int Id)
       {
         TimeSheetItem timeSheet = null;  
         string connectionString = TimeSheetWebAPI.Properties.Settings.Default.ConnectionString;
	
	     using (SqlConnection con = new SqlConnection(connectionString))
	     {
	        //
	        // Open the SqlConnection.
	        //
	        con.Open();
	        //
	        // The following code uses an SqlCommand based on the SqlConnection.
	        //
	        using (SqlCommand command = new SqlCommand("SELECT * FROM tblTimeSheetItem WHERE id = @timeSheetId", con))
	        {
	            command.Parameters.AddWithValue("@timeSheetId", Id);
	            using (SqlDataReader reader = command.ExecuteReader())
	            {
		            while (reader.Read())
		            {
		                timeSheet = new TimeSheetItem();  
		                timeSheet.TimeSheetItemId = Convert.ToInt32(reader.GetValue(0));
		                timeSheet.Name = reader.GetValue(1).ToString(); 
		                timeSheet.Hour = Convert.ToInt32(reader.GetValue(2));
		                timeSheet.CreatedAt = Convert.ToDateTime(reader.GetValue(3).ToString("dd/MM/yyyy"));
		            }
	            }
	        }
	     }
         return emp;
       }
       
       public void Add(TimeSheetItem timeSheetItem)
       {
       TimeSheetItem timeSheet = null;  
         string connectionString = TimeSheetWebAPI.Properties.Settings.Default.ConnectionString;
	
	     using (SqlConnection con = new SqlConnection(connectionString))
	     {
	        //
	        // Open the SqlConnection.
	        //
	        con.Open();
	        //
	        // The following code uses an SqlCommand based on the SqlConnection.
	        //
	        using (SqlCommand command = new SqlCommand("INSERT INTO tblTimeSheetItem (TimeSheetItemId,Name,Hours, CreatedAt) Values (@TimeSheetItemId,@Name,@hours, @CreatedAt)"), conn)
	        {
	            command.Parameters.AddWithValue("@TimeSheetItemId", timeSheetItem.TimeSheetItemId);  
	            command.Parameters.AddWithValue("@Name", timeSheetItem.Name); 
	            command.Parameters.AddWithValue("@Hours", timeSheetItem.Hours);
	            command.Parameters.AddWithValue("@CreatedAt", timeSheetItem.CreatedAt);
	            command.ExecuteNonQuery(); 
	        }
	     }
       }
       
       public IEnumerable<TimeSheetItem> GetAll()
       {
           throw new NotImplementedException();
       }
       
       public void Delete(TimeSheetItem timeSheetItem)
       {
           // ...add implementation
       }
       public void Update(TimeSheetItem timeSheetItem)
       {
           // ...add implementation
       }
       
       public <IEnumerable<TimeSheetItem>> GetAllTimeSheetItemsForADate(DateTime date)
       {  
           // ...add implementation
       }  
       
       public int GetTotalHoursForADate(DateTime date)
       {
           // ...add implementation
       }
}  
```

### Services - Business Logic

Following is the class which handles all the business logic. When we work with enterprise applications with multiple components like Repository, Business logic, Services, Third Party Tools etc., then this service class plays a vital role in this.

```c#
public interface ITimeSheetService
{

    TimeSheetItem Get(int Id);
    void Add(TimeSheetItem timeSheetItem);
    void Delete(TimeSheetItem timeSheetItem);
    void Update(TimeSheetItem timeSheetItem);
    <IEnumerable<TimeSheetItem>> GetAllTimeSheetItemsForADate(DateTime date);
}
```

```c#
public class TimeSheetService : ITimeSheetService 
{  
       private readonly ITimeSheetRepository _timeSheetRepository;
       private readonly int _maximumHours;

       public BlogService(ITimeSheetRepository timeSheetRepository)  
       {  
           _timeSheetRepository = timeSheetRepository; 
           _maximumHours = TimeSheetWebAPI.Properties.Settings.Default.MaximumHours;
       }  
       
       public TimeSheetItem Get(int Id)
       {
          return _timeSheetRepository.Get(Id)
       }
       
       public void Add(TimeSheetItem timeSheetItem)
       {
          // Contains business logic to check if number of hours is bigger then allowed maximum
          int totalHoursPerDay = _timeSheetRepository.GetTotalHoursForADate(timeSheetItem.CreatedAt) 
          if (totalHoursPerDay + timeSheetItem.Hours < _maximumHours)
          {
            _timeSheetRepository.Add(timeSheetItem);
          }
          else
          {
            throw new System.ArgumentException("You have exceeded maximum number of hours per day", "Hours");
          }
       }
       
       // .... Add rest of the methods
}  
```

## Implement UnityResolver with Web API

First, I am going to add Unity package library with TimeSheetWebAPI project to run the UnityResolver class. 
To install Unity from Package Manager Console, just use "Install-Package Unity" command and press enter. 
It will resolve all the dependent dependencies and add the Unity package with TimeSheetWebAPI project.


### Dependency Resolution with the Unity Container

Following class is a UnityResolver class which resolves all the dependencies. I have taken this class from [this article](https://www.c-sharpcorner.com/article/dapper-and-repository-pattern-in-web-api/). This class resolves the dependency for the class and returns the service instance.

An IoC container is a software component that is responsible for managing dependencies. 

You register types with the container, and then use the container to create objects. 

The container automatically figures out the dependency relations. 

Many IoC containers also allow you to control things like object lifetime and scope.

```c#
public class UnityResolver : IDependencyResolver  
{  
        protected IUnityContainer container;  
  
        public UnityResolver(IUnityContainer container)  
        {  
            if (container == null)  
            {  
                throw new ArgumentNullException("container");  
            }  
            this.container = container;  
        }  
  
        public object GetService(Type serviceType)  
        {  
            try  
            {  
                return container.Resolve(serviceType);  
            }  
            catch (ResolutionFailedException)  
            {  
                return null;  
            }  
        }  
  
        public IEnumerable<object> GetServices(Type serviceType)  
        {  
            try  
            {  
                return container.ResolveAll(serviceType);  
            }  
            catch (ResolutionFailedException)  
            {  
                return new List<object>();  
            }  
        }  
  
        public IDependencyScope BeginScope()  
        {  
            var child = container.CreateChildContainer();  
            return new UnityResolver(child);  
        }  
  
        public void Dispose()  
        {  
            container.Dispose();  
        }  
}
```

Register all the dependencies with UnityContainer in the WebAPIConfig file and provide UnityContainerinstance to DependencyResolver to resolve all the dependency at run time.

```c#
public static class WebApiConfig  
{  
        public static void Register(HttpConfiguration config)  
        {  
            var container = new UnityContainer();  
            
            container.RegisterType<ITimeSheetRepository, TimeSheetRepository>();  
            container.RegisterType<ITimeSheetService, ITimeSheetService>();  
            config.DependencyResolver = new UnityResolver(container);  
  
  
            // Web API configuration and services  
            // Configure Web API to use only bearer token authentication.  
            config.SuppressDefaultHostAuthentication();  
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));  
  
            // Web API routes  
            config.MapHttpAttributeRoutes();  
  
            config.Routes.MapHttpRoute(  
                name: "DefaultApi",  
                routeTemplate: "api/{controller}/{id}",  
                defaults: new { id = RouteParameter.Optional }  
            );  
        }  
    }  
} 
```

### Controller

Now everything is done, so it's time to implement a API controller as TimeSheetController to get the data using service class, which will get the data from the database and return it as IHttpActionResult.

```c#
public class TimeSheetController : ApiController  
{  
        ITimeSheetService _timeSheetService;  
  
        public TimeSheetController()  
        {  
  
        }  
        public TimeSheetController(ITimeSheetService timeSheetService)  
        {  
            _timeSheetService = timeSheetService;  
        }  
    
        [HttpGet]
        public IHttpActionResult Get(int Id)  
        {  
            var resultData =  _timeSheetService.Get(Id);  
            if (resultData == null)  
            {  
                return NotFound();  
            }  
            return Ok(resultData);  
        }  
        
        [HttpPost]
        public IHttpActionResult Add(TimeSheetItem timeSheetItem)
        {
        if (ModelState.IsValid)
        {
            _timeSheetService.Add(timeSheetItem);
            return Ok();
        }
        return BadRequest();
        }
    }
}  
```


