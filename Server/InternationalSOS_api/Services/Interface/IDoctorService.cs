using InternationalSOS_api.Models.Doctor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InternationalSOS_api.Services.Interface
{
    public interface IDoctorService
    {
        IEnumerable<DoctorVM> GetDoctorsList();

        IEnumerable<DoctorVM> GetDoctorsListById(int Id);

        IEnumerable<DoctorTypeVM> GetDoctorsTypeList();

        string InsertToDoctorList(DoctorDTO insertDataModel);

        bool DeleteInDoctorList(int Id);

        bool UpdateInDoctorList(DoctorDTO updateDataModel, int Id);
    }
}
