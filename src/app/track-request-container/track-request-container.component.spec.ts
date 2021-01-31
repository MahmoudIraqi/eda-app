import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRequestContainerComponent } from './track-request-container.component';

describe('TrackRequestContainerComponent', () => {
  let component: TrackRequestContainerComponent;
  let fixture: ComponentFixture<TrackRequestContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackRequestContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackRequestContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
