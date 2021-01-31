import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequestContainerComponent } from './new-request-container.component';

describe('NewRequestContainerComponent', () => {
  let component: NewRequestContainerComponent;
  let fixture: ComponentFixture<NewRequestContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRequestContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRequestContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
