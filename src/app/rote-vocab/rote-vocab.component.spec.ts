import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoteVocabComponent } from './rote-vocab.component';

describe('RoteVocabComponent', () => {
  let component: RoteVocabComponent;
  let fixture: ComponentFixture<RoteVocabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoteVocabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoteVocabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
