import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorType } from 'src/app/models/doctor-type.model';
import { DoctorModel } from 'src/app/models/doctor.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-edit-doctor',
  templateUrl: './add-edit-doctor.dialog.html',
  styleUrls: ['./add-edit-doctor.dialog.css']
})
export class AddEditDoctorDialog implements OnInit {


  public isEdit : boolean = false;
  public doctor!: DoctorModel;
  public doctorTypes: DoctorType[]=[];

  constructor(private service: CommonService, private dialogRef: MatDialogRef<AddEditDoctorDialog>) { }


  ngOnInit(): void {
  if(!this.isEdit){
    this.doctor=new DoctorModel();
  }
    this.getDoctorTypes();
  }
  getDoctorTypes() : void{
    this.service.getDoctorTypeList().subscribe(response => {
      this.doctorTypes = response;
    });
  }

  save() : void{
    if(this.isEdit){
      this.service.updateDoctor(this.doctor.DoctorId,this.doctor).subscribe((response)=>{
        if(response){
          this.dialogRef.close(true);
          alert("Doctor deatils updated successfully");
       
        }
      });
       
   
  }
  else{
    this.service.addDoctor(this.doctor).subscribe((response)=>{
      if(response){
        this.dialogRef.close(true);
        alert("Doctor details inserted successfully");
        
      }
    });       
      
  }
  }
  close(): void{
    this.dialogRef.close(false);
  }

  onSubmit() {
  }
}
