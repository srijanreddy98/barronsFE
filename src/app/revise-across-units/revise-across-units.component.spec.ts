import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseAcrossUnitsComponent } from './revise-across-units.component';

describe('ReviseAcrossUnitsComponent', () => {
  let component: ReviseAcrossUnitsComponent;
  let fixture: ComponentFixture<ReviseAcrossUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviseAcrossUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviseAcrossUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
