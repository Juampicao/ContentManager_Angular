import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContentItem } from 'src/app/model/ContentItem';
import { CustomLogger } from 'src/app/utils/CustomLogger';
import { FormularioContentItemComponent } from '../forms/formulario-content-item/formulario-content-item.component';

@Component({
  selector: 'app-view-content-item',
  templateUrl: './view-content-item.component.html',
  styleUrls: ['./view-content-item.component.css'],
})
export class ViewContentItemComponent implements OnInit {
  isLoading: boolean = true;

  contentItem!: ContentItem;
  contentItemMinutes!: number;

  @Input() contentItemHtml!: ContentItem;

  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: ContentItem,
    private _customLogger: CustomLogger,
    private _dialog: MatDialog
  ) {
    this.contentItem = data;
    // this.completeFieldContentItem();
  }

  /**
   * Verifica si viene por html o por inject data y completa el contentItem.
   */
  completeFieldContentItem() {
    if (this.data) {
      this.contentItem = this.data;
    } else if (this.contentItemHtml) {
      this.contentItem = this.contentItemHtml;
    }
  }

  ngOnInit(): void {
    this.loadContentItem();
    this.isLoading = false;
  }

  /**
   * Retorna la información proveniente de data.
   */
  loadContentItem() {
    this._customLogger.logDebug(
      'viewContentItem, loadContentItem ',
      this.contentItem
    );
    this.contentItemMinutes = this.contentItem.duration.minutes;
  }

  onEditContent(contentItem: ContentItem) {
    this._customLogger.logDebug(
      'ViewContent-Item , onEditContent()',
      contentItem
    );
    const dialogRef = this._dialog.open(FormularioContentItemComponent, {
      data: contentItem,
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this._customLogger.logDebug(
          'ViewContentList, onEditContent()',
          'Cerrar, respuesta form: true'
        );
      }
      this._customLogger.logDebug(
        'ViewContentList, onEditContent()',
        'Cerrar, respuesta form: false'
      );
    });
  }

  onCreateContent() {
    this._customLogger.logDebug('ViewContent-Item, onCreateContent()');
    const dialogRef = this._dialog.open(FormularioContentItemComponent, {
      data: '',
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this._customLogger.logDebug(
          'viewContentList, onCreateContent()',
          'Cerrar, respuesta form: true'
        );
      }
      this._customLogger.logDebug(
        'viewContentList, onCreateContent()',
        'Cerrar, respuesta form: false'
      );
    });
  }

  // getDate(): string {
  //   return this.contentItem.fechaCreacion.toISOString().split('T')[0];
  // }

  getDate() {
    let fechaCreacion = this.contentItem.fechaCreacion;

    if (fechaCreacion) {
      if (typeof fechaCreacion === 'string') {
        // si fechaCreacion es una cadena, la convertimos en un objeto de fecha
        let date = new Date(Date.parse(fechaCreacion));
        return fechaCreacion;
      } else {
        // si fechaCreacion ya es un objeto de fecha, simplemente obtenemos la marca de tiempo
        return this.contentItem.fechaCreacion.toISOString().split('T')[0];
      }
    } else {
      return 'No hay fecha';
    }
  }
}
