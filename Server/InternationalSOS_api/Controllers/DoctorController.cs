using InternationalSOS_api.Models.Doctor;
using InternationalSOS_api.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace InternationalSOS_api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DoctorController : ApiController
    {
        private readonly IDoctorService _objDoctorService;

        public DoctorController(IDoctorService objDoctorService)
        {
            this._objDoctorService = objDoctorService;
        }

        [Route("api/Doctor")]
        [HttpGet]
        public HttpResponseMessage Get()
        {
            IEnumerable<DoctorVM> DotModel = _objDoctorService.GetDoctorsList();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, DotModel);
            return response;
        }

        [Route("api/Doctor/{id}")]
        [HttpGet]
        public HttpResponseMessage Get(int id)
        {
            IEnumerable<DoctorVM> DotModel = _objDoctorService.GetDoctorsListById(id);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, DotModel);
            return response;
        }

        [Route("api/Doctor/Type")]
        [HttpGet]
        public HttpResponseMessage GetDoctorType()
        {
            IEnumerable<DoctorTypeVM> DotModel = _objDoctorService.GetDoctorsTypeList();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, DotModel);
            return response;
        }

        [Route("api/Doctor")]
        [HttpPost]
        public HttpResponseMessage Post(DoctorDTO datamodel)
        {
            string response = _objDoctorService.InsertToDoctorList(datamodel);
            var message = Request.CreateResponse(HttpStatusCode.Created, response);
            return message;
        }

        [Route("api/Doctor/{id}")]
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            bool response = _objDoctorService.DeleteInDoctorList(id);
            var message = Request.CreateResponse(HttpStatusCode.OK, response);
            return message;
        }

        [Route("api/Doctor/{id}")]
        [HttpPut]
        public HttpResponseMessage Put(int id, DoctorDTO datamodel)
        {
            bool response = _objDoctorService.UpdateInDoctorList(datamodel, id);
            HttpResponseMessage message = Request.CreateResponse(HttpStatusCode.OK, response);
            return message;
        }


    }
}
