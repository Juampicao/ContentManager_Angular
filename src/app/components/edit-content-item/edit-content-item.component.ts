import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentItem } from 'src/app/model/ContentItem';
import { CustomLogger } from 'src/app/utils/CustomLogger';

@Component({
  selector: 'app-edit-content-item',
  templateUrl: './edit-content-item.component.html',
  styleUrls: ['./edit-content-item.component.css']
})
export class EditContentItemComponent implements OnInit {

  contentItem!: ContentItem 

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ContentItem,
    private _customLogger: CustomLogger
  ) {
    this.contentItem = data;
  }

  ngOnInit(): void {
    this.loadContentItem;
  }

  /**
   * Retorna la información proveniente de data.
   */
  loadContentItem() {
    this._customLogger.logDebug("editContentItem, onInit => Data=", this.data)
  }

}
