import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MyClientNotification } from 'src/app/services/clientNotification/myClientNotification';
import { CustomLogger } from 'src/app/utils/CustomLogger';

@Component({
  selector: 'app-video-play-two',
  templateUrl: './video-play-two.component.html',
  styleUrls: ['./video-play-two.component.css']
})
export class VideoPlayTwoComponent implements OnInit {
@Input() srcVideo!: string;

  videoUrl!: SafeResourceUrl;
  isLoading: boolean = false; 

  constructor(
    private customLogger: CustomLogger,
    private sanitizer: DomSanitizer,
    private _clientNotification: MyClientNotification,
  ) { 
  }

  ngOnInit(): void {
    try {
      this.parseVideoUrl(this.srcVideo)
      return this.customLogger.logDebug("VideoPlayComponent", "srcVideo", this.srcVideo);
    } catch (error) {
      this._clientNotification.openNotification(`Hubo un error al ver el video ${error}`)
      this.customLogger.logError("VideoPlayComponent", error); 
    }
  }

  ngAfterViewInit(): void {
    if (this.videoUrl) {
      this.isLoading = false;
    }
  }
  
  /**
   * Transforma el link de youtube a embed, para poder ser ejecutado en nuestra pagina.
   * @param videoUrl string
   */
  parseVideoUrl(videoUrl: string) {
    //? Correcta.
    // https://www.youtube.com/embed/qz0WjbGlmv0
    
    //! Erronea.
    // https://www.youtube.com/watch?v=dAAPKZGjOKc

    try {
      let newUrl = videoUrl.replace("watch?v=", "embed/");

      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newUrl);
      this.customLogger.logDebug("VideoPlayComponent", "videoUrl", this.videoUrl); 
      
    } catch (error) {
      this._clientNotification.openNotification(`Hubo un error al ver el video ${error}`)
      this.customLogger.logError("VideoPlayComponent", error); 
      
    }

  }

}
