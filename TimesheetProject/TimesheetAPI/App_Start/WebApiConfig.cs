using System.Web.Http;
using System.Web.Http.Cors;
using TimesheetApplication.Repositories;
using TimesheetApplication.Services;
using Unity;

namespace TimesheetApplication
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var container = new UnityContainer();

            container.RegisterType<ITimesheetRepository, TimesheetRepository>();
            container.RegisterType<ITimesheetService, TimesheetService>();
            container.RegisterType<IQuoteService, QuoteService>();
            container.RegisterType<IQuoteReader, QuoteReader>();
            config.DependencyResolver = new UnityResolver(container);


            // Web API configuration and services  
            // Configure Web API to use only bearer token authentication.  
            //config.SuppressDefaultHostAuthentication();
            //config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            
            // Web API routes  
            config.MapHttpAttributeRoutes();
            var corsAttr = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(corsAttr);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
