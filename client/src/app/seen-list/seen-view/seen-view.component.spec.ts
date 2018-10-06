import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeenViewComponent } from './seen-view.component';

describe('SeenViewComponent', () => {
  let component: SeenViewComponent;
  let fixture: ComponentFixture<SeenViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeenViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
