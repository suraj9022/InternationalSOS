import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonService } from 'src/app/services/common.service';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DoctorComponent } from './doctor.component';
import { HttpClient } from '@angular/common/http';

describe('DoctorComponent', () => {
  let component: DoctorComponent;
  let fixture: ComponentFixture<DoctorComponent>;
  let service : CommonService;
  let httpclient : HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule,MatDialogModule ],
        providers:[CommonService]
    });
    service = TestBed.inject(CommonService);
    httpclient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Testing #1 should retrun doctor list', ()=>{
    let fixture = TestBed.createComponent(DoctorComponent);
    let component = fixture.componentInstance;

    var mokeData= [
      {DoctorId: 1, Name: 'Robin', Contact: '9876534567', Email: 'robin@gmail.com', Address: 'Mumbai', Type: 'Infectious'}
    ];    

    expect(component.getDoctorLists.length).toBeLessThanOrEqual(mokeData.length);
  })

});
