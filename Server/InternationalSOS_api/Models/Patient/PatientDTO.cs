using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternationalSOS_api.Models.Patient
{
    public class PatientDTO
    {
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Type { get; set; }
        public int DoctorId { get; set; }
    }
}