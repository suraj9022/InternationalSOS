import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { DoctorModel } from '../models/doctor.model';
import { PatientModel } from '../models/patients.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

   readonly baseURL = environment.baseUrl;

  constructor(private http:HttpClient) { }

  // Doctor API 
    getDoctorList():Observable<DoctorModel[]> {
      return this.http.get<DoctorModel[]>(this.baseURL + '/api/Doctor');
    }

    addDoctor(payload:any) {
      return this.http.post(this.baseURL + '/api/Doctor', payload);
    }

    updateDoctor(id:number, payload:any) {
      return this.http.put(this.baseURL + `/api/Doctor/${id}`, payload);
    }

    deleteDoctor(id:number) {
      return this.http.delete(this.baseURL + `/api/Doctor/${id}`);
    }


    //Patient API

    getPatientList():Observable<PatientModel[]> {
      return this.http.get<PatientModel[]>(this.baseURL + '/api/Patient');
    }

    addPatient(payload:any) {
      return this.http.post(this.baseURL + '/api/Patient', payload);
    }

    updatePatient(id:number, payload:any) {
      return this.http.put(this.baseURL + `/api/Patient/${id}`, payload);
    }

    deletePatient(id:number) {
      return this.http.delete(this.baseURL + `/api/Patient/${id}`);
    }


    // Doctor Type 


     getDoctorTypeList():Observable<any[]> {
      return this.http.get<any>(this.baseURL + '/api/Doctor/Type');
    }

    getDoctorNameTypeList():Observable<any[]> {
      return this.http.get<any>(this.baseURL + '/api/Patient/DoctorNameType');
    }
 
}
