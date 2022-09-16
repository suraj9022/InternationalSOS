import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPatientDialog } from './add-edit-patient.dialog';

describe('AddEditPatientDialog', () => {
  let component: AddEditPatientDialog;
  let fixture: ComponentFixture<AddEditPatientDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPatientDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPatientDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
