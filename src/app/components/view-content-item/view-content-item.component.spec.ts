import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContentItemComponent } from './view-content-item.component';

describe('ViewContentItemComponent', () => {
  let component: ViewContentItemComponent;
  let fixture: ComponentFixture<ViewContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewContentItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
