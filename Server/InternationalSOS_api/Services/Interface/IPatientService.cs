using InternationalSOS_api.Models.Doctor;
using InternationalSOS_api.Models.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InternationalSOS_api.Services.Interface
{
    public interface IPatientService
    {

        IEnumerable<PatientVM> GetPatientsList();

        IEnumerable<PatientVM> GetPatientsListById(int Id);

        string InsertToPatientList(PatientDTO insertDataModel);

        bool DeleteInPatientList(int Id);

        bool UpdateInPatientList(PatientDTO updateDataModel, int Id);

        IEnumerable<DoctorVM> GetDoctorNameAndType();
    }
}
