using InternationalSOS_api.DBContext;
using InternationalSOS_api.Models.Doctor;
using InternationalSOS_api.Models.Patient;
using InternationalSOS_api.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InternationalSOS_api.Services
{
    public class PatientService : IPatientService
    {
        private InternationalSOSDBEntities dbContext = new InternationalSOSDBEntities();
        public IEnumerable<PatientVM> GetPatientsList()
        {
            List<PatientVM> PatientModel = new List<PatientVM>();

            PatientModel = (from d in dbContext.Doctors
                            join p in dbContext.Patients on d.Doctor_Id equals p.Doctor_Id
                            select new PatientVM()
                            {
                                Address = p.Address,
                                Contact = p.Contact,
                                Email = p.Email,
                                Name = p.Name,
                                Type = p.Type,
                                PatientId = p.Patient_Id,
                                DoctorName = d.Name,
                                DoctorId = d.Doctor_Id

                            }).ToList();
            return PatientModel;
        }

        public IEnumerable<PatientVM> GetPatientsListById(int Id)
        {
            List<PatientVM> PatientModel = new List<PatientVM>();

            PatientModel = dbContext.Patients.Where(e => e.Patient_Id == Id).Select(x => new PatientVM
            {
                PatientId = x.Patient_Id,
                Address = x.Address,
                Contact = x.Contact,
                Email = x.Email,
                Name = x.Name,
                Type = x.Type,
                DoctorId = x.Doctor_Id
            }).ToList();

            return PatientModel;
        }

        public IEnumerable<DoctorVM> GetDoctorNameAndType()
        {
            List<DoctorVM> docNameAndTypeModel = new List<DoctorVM>();
            docNameAndTypeModel = (from d in dbContext.Doctors
                                   join dt in dbContext.Doctor_Type on d.Type equals dt.Type_Id
                                   select new DoctorVM()
                                   {
                                       Name = d.Name,
                                       Doctor_Type = dt.Name,
                                       DoctorId = d.Doctor_Id
                                   }).ToList();
            return docNameAndTypeModel;
        }

        public string InsertToPatientList(PatientDTO datamodel)
        {
            try
            {
                using (var context = new InternationalSOSDBEntities())
                {
                    context.Patients.Add(new Patient()
                    {
                        Address = datamodel.Address,
                        Contact = datamodel.Contact,
                        Email = datamodel.Email,
                        Name = datamodel.Name,
                        Doctor_Id = datamodel.DoctorId,
                        Type = datamodel.Type
                    });
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return "Insert Failed" + ex;
            }

            return "Inserted...Successfully";
        }

        public bool DeleteInPatientList(int Id)
        {
            try
            {
                using (var context = new InternationalSOSDBEntities())
                {
                    var isvalid = context.Patients.Where(s => s.Patient_Id == Id).FirstOrDefault();
                    context.Patients.Remove(isvalid);
                    context.SaveChanges();
                }
            }

            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        public bool UpdateInPatientList(PatientDTO updateModelData, int Id)
        {
            try
            {
                using (var context = new InternationalSOSDBEntities())
                {
                    var entity = context.Patients.FirstOrDefault(e => e.Patient_Id == Id);
                    if (entity == null)
                    {
                    }
                    else
                    {
                        entity.Address = updateModelData.Address;
                        entity.Contact = updateModelData.Contact;
                        entity.Email = updateModelData.Email;
                        entity.Name = updateModelData.Name;
                        entity.Type = updateModelData.Type;
                        entity.Doctor_Id = updateModelData.DoctorId;

                        context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;

        }

      
    }
}