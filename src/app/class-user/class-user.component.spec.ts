import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassUserComponent } from './class-user.component';

describe('ClassUserComponent', () => {
  let component: ClassUserComponent;
  let fixture: ComponentFixture<ClassUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
