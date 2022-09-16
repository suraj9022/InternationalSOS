import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AddEditPatientDialog } from 'src/app/dialogs/add-edit-patient/add-edit-patient.dialog';
import { PatientModel } from 'src/app/models/patients.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public patientList: PatientModel[] = [];

  public displayedColumns: string[] = ['PatientId', 'Name', 'Contact', 'Email', 'Address', 'Patient_Type','Doctor_Name', 'action'];
  public dataSource!: MatTableDataSource<PatientModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private subscription : Subscription = new Subscription;

  constructor(private service: CommonService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getPatientLists();
  }

  getPatientLists(): void {

    this.subscription.add(

    this.service.getPatientList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert("Error while fetching Patient deatils");
      }
    })
    )
  }
  openAddPatientDialog() : void {
    const addPatientDialogRef = this.dialog.open(AddEditPatientDialog, {
      width: '30%'
    });
    addPatientDialogRef.componentInstance.isEdit = false;
    addPatientDialogRef.afterClosed().subscribe((response)=> {
      if(response){
      this.getPatientLists();
      }
    });
  }

  editPatientInfo(patient: PatientModel): void {
    const editPatientDialogRef = this.dialog.open(AddEditPatientDialog, {
      width: '30%'
    });
    editPatientDialogRef.componentInstance.isEdit = true;
    editPatientDialogRef.componentInstance.patient = patient;
    editPatientDialogRef.afterClosed().subscribe((response)=> {
      if(response){
      this.getPatientLists();
      }
    });
  }

  delete(patient: PatientModel): void {
    if (confirm(`Are you sure you want to delete Patient ${patient.Name}`)) {
      this.service.deletePatient(patient.PatientId).subscribe(response => {
        this.getPatientLists();
      });
    }
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
