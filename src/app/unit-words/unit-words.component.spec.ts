import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitWordsComponent } from './unit-words.component';

describe('UnitWordsComponent', () => {
  let component: UnitWordsComponent;
  let fixture: ComponentFixture<UnitWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
