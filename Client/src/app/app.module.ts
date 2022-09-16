import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './services/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DoctorComponent } from './components/doctor/doctor.component';
import { AddEditDoctorDialog } from './dialogs/add-edit-doctor/add-edit-doctor.dialog';
import { PatientComponent } from './components/patient/patient.component';
import { AddEditPatientDialog } from './dialogs/add-edit-patient/add-edit-patient.dialog';


@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    AddEditDoctorDialog,
    PatientComponent,
    AddEditPatientDialog

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },CommonService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
