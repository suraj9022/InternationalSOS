using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternationalSOS_api.Models.Doctor
{
    public class DoctorDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int? Type { get; set; }
    }
}