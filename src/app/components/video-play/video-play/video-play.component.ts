import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MyClientNotification } from 'src/app/services/clientNotification/myClientNotification';
import { CustomLogger } from 'src/app/utils/CustomLogger';

@Component({
  selector: 'app-video-play',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.css']
})

export class VideoPlayComponent implements OnInit,  AfterViewInit  {
  
  @Input() srcVideo!: string;

  videoUrl!: SafeResourceUrl;
  isLoading: boolean = false; 

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: string,
    private customLogger: CustomLogger,
    private sanitizer: DomSanitizer,
    private _clientNotification: MyClientNotification,
  ) { 
      this.data = data || ''; // Si data es nulo o indefinido, establece una cadena vacía como valor predeterminado.
  }

  ngOnInit(): void {
    try {
      if (this.srcVideo) {
        this.parseVideoUrl(this.srcVideo)
        return this.customLogger.logDebug("VideoPlayComponent", "src", this.srcVideo);
      } else {
        this.customLogger.logDebug("VideoPlayComponent", "data", this.data);
        this.parseVideoUrl(this.data)
      }
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
