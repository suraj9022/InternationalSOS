using InternationalSOS_api.Models.Doctor;
using InternationalSOS_api.Models.Patient;
using InternationalSOS_api.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace InternationalSOS_api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PatientController : ApiController
    {
        private readonly IPatientService _objPatientService;

        public PatientController(IPatientService objPatientService)
        {
            this._objPatientService = objPatientService;
        }

        [Route("api/Patient")]
        [HttpGet]
        public HttpResponseMessage Get()
        {
            IEnumerable<PatientVM> DotModel = _objPatientService.GetPatientsList();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, DotModel);
            return response;
        }

        [Route("api/Patient/{id}")]
        [HttpGet]
        public HttpResponseMessage Get(int id)
        {
            IEnumerable<PatientVM> DotModel = _objPatientService.GetPatientsListById(id);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, DotModel);
            return response;
        }

        [Route("api/Patient")]
        [HttpPost]
        public HttpResponseMessage Post(PatientDTO datamodel)
        {
            string response = _objPatientService.InsertToPatientList(datamodel);
            var message = Request.CreateResponse(HttpStatusCode.Created, response);
            return message;
        }

        [Route("api/Patient/{id}")]
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            bool response = _objPatientService.DeleteInPatientList(id);
            var message = Request.CreateResponse(HttpStatusCode.OK, response);
            return message;
        }

        [Route("api/Patient/{id}")]
        [HttpPut]
        public HttpResponseMessage Put(int id, PatientDTO datamodel)
        {
            bool response = _objPatientService.UpdateInPatientList(datamodel, id);
            HttpResponseMessage message = Request.CreateResponse(HttpStatusCode.OK, response);
            return message;
        }

        [Route("api/Patient/DoctorNameType")]
        [HttpGet]
        public HttpResponseMessage GetDoctorNameType()
        {
            IEnumerable<DoctorVM> DotModel = _objPatientService.GetDoctorNameAndType();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, DotModel);
            return response;
        }

    }
}
