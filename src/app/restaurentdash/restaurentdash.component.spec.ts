import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurentdashComponent } from './restaurentdash.component';

describe('RestaurentdashComponent', () => {
  let component: RestaurentdashComponent;
  let fixture: ComponentFixture<RestaurentdashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurentdashComponent]
    });
    fixture = TestBed.createComponent(RestaurentdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
