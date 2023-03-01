import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayTwoComponent } from './video-play-two.component';

describe('VideoPlayTwoComponent', () => {
  let component: VideoPlayTwoComponent;
  let fixture: ComponentFixture<VideoPlayTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPlayTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPlayTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
