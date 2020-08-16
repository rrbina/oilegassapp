using AutoMapper;
using System.Web.Http;

namespace Server
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            Mapper.Initialize(c => c.AddProfile<App_Start.MappingProfile>());
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
