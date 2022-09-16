import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { DoctorModel } from 'src/app/models/doctor.model';
import { AddEditDoctorDialog } from 'src/app/dialogs/add-edit-doctor/add-edit-doctor.dialog';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit, OnDestroy {

  public doctorList: DoctorModel[] = [];

  public displayedColumns: string[] = ['DoctorId', 'Name', 'Contact', 'Email', 'Address', 'Doctor_Type', 'action'];
  public dataSource!: MatTableDataSource<DoctorModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private subscription : Subscription = new Subscription;

  constructor(private service: CommonService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.getDoctorLists();
  }

  getDoctorLists(): void {

    this.subscription.add(

    this.service.getDoctorList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert("Error while fetching Doctor deatils");
      }
    })
    )
  }
  openAddDoctorDialog() : void {
    const addDoctorDialogRef = this.dialog.open(AddEditDoctorDialog, {
      width: '30%'
    });
    addDoctorDialogRef.componentInstance.isEdit = false;
    addDoctorDialogRef.afterClosed().subscribe((response)=> {
      if(response){
      this.getDoctorLists();
      }
    });
  }

  editDoctorInfo(doctor: DoctorModel): void {
    const editDoctorDialogRef = this.dialog.open(AddEditDoctorDialog, {
      width: '30%'
    });
    editDoctorDialogRef.componentInstance.isEdit = true;
    editDoctorDialogRef.componentInstance.doctor = doctor;
    editDoctorDialogRef.afterClosed().subscribe((response)=> {
      if(response){
      this.getDoctorLists();
      }
    });
  }

  delete(doctor: DoctorModel): void {

    if (confirm(`Are you sure you want to delete Doctor ${doctor.Name}`)) {
      this.service.deleteDoctor(doctor.DoctorId).subscribe(response => {
        this.getDoctorLists();
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
