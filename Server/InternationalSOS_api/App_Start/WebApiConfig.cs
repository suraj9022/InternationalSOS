using InternationalSOS_api.DI_Resolver;
using InternationalSOS_api.Services;
using InternationalSOS_api.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Unity;
using System.Web.Http.Cors;

namespace InternationalSOS_api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            var container = new UnityContainer();
            container.RegisterType<IPatientService, PatientService>();
            container.RegisterType<IDoctorService, DoctorService>();
            config.DependencyResolver = new UnityResolver(container);

            // Web API routes

            config.EnableCors();
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
