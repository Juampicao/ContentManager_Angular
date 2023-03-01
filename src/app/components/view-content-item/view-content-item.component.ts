import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentItem } from 'src/app/model/ContentItem';
import { CustomLogger } from 'src/app/utils/CustomLogger';
import { FormularioContentItemComponent } from '../forms/formulario-content-item/formulario-content-item.component';

@Component({
  selector: 'app-view-content-item',
  templateUrl: './view-content-item.component.html',
  styleUrls: ['./view-content-item.component.css']
})
export class ViewContentItemComponent implements OnInit {
 
  contentItem!: ContentItem 
  contentItemMinutes!: number; 
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ContentItem,  
    private _customLogger: CustomLogger,
    private _dialog : MatDialog
  ) {
    this.contentItem = data;
  }

  ngOnInit(): void {
    this.loadContentItem();
  }

  /**
   * Retorna la información proveniente de data.
   */
  loadContentItem() {
    this._customLogger.logDebug("viewContentItem, loadContentItem ", this.contentItem)
    this.contentItemMinutes = this.contentItem.duration.minutes
  }

  onEditContent(contentItem: ContentItem) {
    this._customLogger.logDebug("ViewContent-Item , onEditContent()", contentItem)
    const dialogRef = this._dialog.open(FormularioContentItemComponent, {
      data: contentItem
    })

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this._customLogger.logDebug("ViewContentList, onEditContent()", "Cerrar, respuesta form: true")
      }
      this._customLogger.logDebug("ViewContentList, onEditContent()", "Cerrar, respuesta form: false")
    })
  }

  onCreateContent() {
    this._customLogger.logDebug("ViewContent-Item, onCreateContent()", )
    const dialogRef = this._dialog.open(FormularioContentItemComponent, {
      data: "",
    })
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this._customLogger.logDebug("viewContentList, onCreateContent()", "Cerrar, respuesta form: true")
      }
      this._customLogger.logDebug("viewContentList, onCreateContent()", "Cerrar, respuesta form: false")
    })
  }
}
