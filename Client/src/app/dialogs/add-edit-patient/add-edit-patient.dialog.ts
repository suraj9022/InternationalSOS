import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DoctorNameType } from 'src/app/models/doctor-name-type.model';
import { DoctorModel } from 'src/app/models/doctor.model';
import { PatientModel } from 'src/app/models/patients.model';
import { CommonService } from 'src/app/services/common.service';
import { AddEditDoctorDialog } from '../add-edit-doctor/add-edit-doctor.dialog';

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.dialog.html',
  styleUrls: ['./add-edit-patient.dialog.css']
})
export class AddEditPatientDialog implements OnInit {

  patient!: PatientModel;
  doctorNameType: DoctorNameType[] = [];
  public isEdit: boolean = false;

  constructor(private service: CommonService, private dialogRef: MatDialogRef<AddEditDoctorDialog>) { }

  ngOnInit(): void {
    console.log(this.patient);
    if (!this.isEdit) {
      this.patient = new PatientModel();
    }
    this.getDoctorNameTypes();
    console.log(this.doctorNameType);
  }


  getDoctorNameTypes() {
    this.service.getDoctorNameTypeList().subscribe(response => {
      this.doctorNameType = response;
    });
  }

  save(): void {
    if (this.isEdit) {
      this.service.updatePatient(this.patient.PatientId, this.patient).subscribe((response) => {
        if (response) {
          this.dialogRef.close(true);
          alert("Patient deatils updated successfully");

        }
      });


    }
    else {
      this.service.addPatient(this.patient).subscribe((response) => {
        if (response) {
          this.dialogRef.close(true);
          alert("Patient details inserted successfully");

        }
      });

    }
  }
  close(): void {
    this.dialogRef.close(false);
  }

  onSubmit() {
  }


}
