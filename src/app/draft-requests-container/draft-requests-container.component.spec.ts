import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftRequestsContainerComponent } from './draft-requests-container.component';

describe('DraftRequestsContainerComponent', () => {
  let component: DraftRequestsContainerComponent;
  let fixture: ComponentFixture<DraftRequestsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftRequestsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftRequestsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
