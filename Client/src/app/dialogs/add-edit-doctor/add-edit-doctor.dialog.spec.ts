import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDoctorDialog } from './add-edit-doctor.dialog';

describe('AddEditDoctorDialog', () => {
  let component: AddEditDoctorDialog;
  let fixture: ComponentFixture<AddEditDoctorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDoctorDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDoctorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
