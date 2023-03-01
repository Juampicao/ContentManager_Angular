import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentItemListComponent } from './content-item-list.component';

describe('ContentItemListComponent', () => {
  let component: ContentItemListComponent;
  let fixture: ComponentFixture<ContentItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
