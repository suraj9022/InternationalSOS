using InternationalSOS_api.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using InternationalSOS_api.Models.Doctor;
using InternationalSOS_api.DBContext;
using InternationalSOS_api.Models;

namespace InternationalSOS_api.Services
{
    public class DoctorService : IDoctorService
    {
        private InternationalSOSDBEntities dbContext = new InternationalSOSDBEntities();

        public IEnumerable<DoctorVM> GetDoctorsList()
        {
            List<DoctorVM> doctorModel = new List<DoctorVM>();

            doctorModel = (from d in dbContext.Doctors
                           join p in dbContext.Doctor_Type on d.Type equals p.Type_Id into DocType
                           from dType in DocType.DefaultIfEmpty()
                           select new DoctorVM()
                           {
                               DoctorId = d.Doctor_Id,
                               Name = d.Name,
                               Address = d.Address,
                               Contact = d.Contact,
                               Email = d.Email,
                               Type= dType.Type_Id,
                               Doctor_Type = dType.Name,
                           }).ToList();

            return doctorModel;
        }

        public IEnumerable<DoctorVM> GetDoctorsListById(int id)
        {
            List<DoctorVM> doctorModel = new List<DoctorVM>();

            doctorModel = dbContext.Doctors.Where(e => e.Doctor_Id == id).Select(x => new DoctorVM
            {
                Address = x.Address,
                Contact = x.Contact,
                Email = x.Email,
                Name = x.Name,
                Type = x.Type,
                DoctorId = x.Doctor_Id
            }).ToList();

            return doctorModel;
        }

        public IEnumerable<DoctorTypeVM> GetDoctorsTypeList()
        {
            List<DoctorTypeVM> doctorModel = new List<DoctorTypeVM>();
            doctorModel = dbContext.Doctor_Type.Select(x => new DoctorTypeVM
            {
                Id = x.Type_Id,
                Type= x.Name

            }).ToList();


            return doctorModel;
        }

        public string InsertToDoctorList(DoctorDTO datamodel)
        {
            try
            {
                using (var context = new InternationalSOSDBEntities())
                {
                    context.Doctors.Add(new Doctor()
                    {
                        Address= datamodel.Address,
                        Contact= datamodel.Contact,
                        Email=datamodel.Email,
                        Name= datamodel.Name,
                        Type= datamodel.Type
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

        public bool DeleteInDoctorList(int Id)
        {
            try
            {
                using (var context = new InternationalSOSDBEntities())
                {
                    var isvalid = context.Doctors.Where(s => s.Doctor_Id == Id).FirstOrDefault();
                    context.Doctors.Remove(isvalid);
                    context.SaveChanges();
                }
            }

            catch(Exception ex)
            {
                return false;
            }
            return true;
        }

        public bool UpdateInDoctorList(DoctorDTO updateModelData, int Id)
        {
            try
            {
                using (var context = new InternationalSOSDBEntities())
                {
                    var entity = context.Doctors.FirstOrDefault(e => e.Doctor_Id == Id);
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

                        context.SaveChanges();
                    }
                }
            }
            catch(Exception ex)
            {
                return false;
            }
            return true;
               
        }
    }
}