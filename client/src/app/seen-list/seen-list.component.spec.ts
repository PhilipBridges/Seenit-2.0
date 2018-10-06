import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeenListComponent } from './seen-list.component';

describe('SeenListComponent', () => {
  let component: SeenListComponent;
  let fixture: ComponentFixture<SeenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
