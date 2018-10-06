import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeenFormComponent } from './seen-form.component';

describe('SeenFormComponent', () => {
  let component: SeenFormComponent;
  let fixture: ComponentFixture<SeenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
