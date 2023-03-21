import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyErrorHandlerService } from 'src/app/error/service/my-error-handler.service';
import { ContentItem } from 'src/app/model/ContentItem';
import { Duration } from 'src/app/model/Duration';
import { IContentItemRating, IContentType } from 'src/app/model/Interfaces';
import { MyClientNotificationService } from 'src/app/services/clientNotification/my-client-notification.service';
import { IContentManagerService } from 'src/app/services/interface/IContentManagerService';
import { ServiceInjector } from 'src/app/services/ServiceInjector';
import { CustomLogger } from 'src/app/utils/CustomLogger';

@Component({
  selector: 'app-formulario-content-item',
  templateUrl: './formulario-content-item.component.html',
  styleUrls: ['./formulario-content-item.component.css'],
})
export class FormularioContentItemComponent implements OnInit {
  // ContentItem Principal
  contentItem!: ContentItem;
  isContentTypeVideo: boolean = false;

  // Input Options
  public ratingOptions: IContentItemRating[] = [
    IContentItemRating.Void,
    IContentItemRating.Uno,
    IContentItemRating.Dos,
    IContentItemRating.Tres,
    IContentItemRating.Cuatro,
    IContentItemRating.Cinco,
  ];
  public ratingVoid: IContentItemRating = IContentItemRating.Void;

  public tagsOptions: string[];
  public tagsOptionsVoid = [];

  public contentTypeOptions: IContentType[];
  public contentTypeOptionVoid: IContentType = IContentType.Void;

  public hours = [1, 2, 3];
  public minutes = [
    1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 45, 55, 60, 75, 90, 120, 150, 180,
  ];

  // Initial Values New ContentItem;
  public filterValues: any = {
    id: '',
    title: '',
    description: '',
    rating: this.ratingVoid,
    tags: this.tagsOptionsVoid,
    contentType: this.contentTypeOptionVoid,
    fechaCreacion: new Date().toISOString().substring(0, 10),
    duration: new Duration(0, 15, 0),
    videoUrl: '',
  };

  public myForm!: FormGroup;
  private _serviceContentManager!: IContentManagerService; // Typescript Solution Vanilla

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ContentItem,
    private _handleError: MyErrorHandlerService,
    private _customLogger: CustomLogger,
    private formBuilder: FormBuilder,
    private _clientNotification: MyClientNotificationService
  ) {
    this.contentItem = data;
    this._serviceContentManager = ServiceInjector.selectService('mock'); // Solucion Typescript Vanilla
    this.tagsOptions = this._serviceContentManager.getUniqueTags();
    this.contentTypeOptions =
      this._serviceContentManager.getUniqueContentTypes();
  }

  ngOnInit(): void {
    try {
      this.rellenarFormEditar();
    } catch (error) {
      this._handleError.customError(
        error,
        'Formulario-Content-Item ngOnInit()',
        `Formulario-Content-Item on onInit(), ${error}`
      );
    }
  }

  // Complete Form with ContentItem to edit.
  private async rellenarFormEditar() {
    // this._customLogger.logDebug("RellenarForm", "", this.contentItem)
    const {
      title,
      description,
      rating,
      duration,
      contentType,
      tags,
      fechaCreacion,
      id,
      videoUrl,
    } = this.contentItem;

    if (this.contentItem) {
      const editFilterValues: any = {
        id: id,
        title: title,
        rating: rating,
        description: description,
        tags: tags,
        contentType: contentType,
        fechaCreacion: fechaCreacion,
        duration: duration,
        videoUrl: videoUrl,
      };

      if (this.contentItem.contentType === 'video') {
        this.isContentTypeVideo = true;
      }

      this.filterValues = editFilterValues;
    }

    await this.initialForm();
  }

  // Init Form
  private async initialForm() {
    try {
      const {
        title,
        description,
        tags,
        rating,
        contentType,
        fechaCreacion,
        duration,
        id,
        videoUrl,
      } = this.filterValues;

      this.myForm = this.formBuilder.group({
        id: [id],
        title: [title, Validators.required],
        description: [description, Validators.required],
        rating: [rating, Validators.required],
        tags: [tags, Validators.required],
        contentType: [contentType, Validators.required],
        fechaCreacion: [
          // fechaCreacion.toISOString().substring(0, 10),
          fechaCreacion,
          Validators.required,
        ],
        duration: [duration.minutes],
        videoUrl: [videoUrl],
      });

      // Si es contentType video, obligar los campos de videoUrl y duration.
      this.myForm.get('contentType')?.valueChanges.subscribe((value) => {
        if (value === 'video') {
          this.myForm
            .get('videoUrl')
            ?.setValidators([
              Validators.required,
              Validators.pattern(
                /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/
              ),
            ]);
          this.myForm.get('duration')?.setValidators([Validators.required]);
          this.isContentTypeVideo = true;
        } else {
          // this.myForm.get('videoUrl')?.setValidators(null);
          // this.myForm.get('duration')?.setValidators(null);
          this.isContentTypeVideo = false;
        }
        // this.myForm.get('contentType')?.updateValueAndValidity();
        this.myForm.get('videoUrl')?.updateValueAndValidity();
        this.myForm.get('duration')?.updateValueAndValidity();
      });

      this._customLogger.logDebug('onInitialForm', '', this.myForm.value);
    } catch (error) {
      this._handleError.customError(
        error,
        'Formulario-Content-Item on initialForm()',
        `Formulario-Content-Item on initialForm(), ${error}`
      );
      this._clientNotification.openNotification(`${error}`, 'error');
    }
  }

  /**
   * Reset form to initial Values.
   */
  resetForm() {
    this._customLogger.logDebug(
      'resetForm',
      `Viejo ${JSON.stringify(this.myForm.value)}`
    );
    this.initialForm();
    this._customLogger.logDebug(
      'resetForm',
      `Nuevo ${JSON.stringify(this.myForm.value)}`
    );
  }

  /**
   * Submit Form active the new filters.
   * @param form
   */
  onSubmit(form: FormGroup) {
    this._customLogger.logDebug('OnSubmitForm', this.myForm.value);

    try {
      if (this.contentItem) {
        this._customLogger.logDebug(
          'OnSubmitForm, editContent()',
          this.myForm.value
        );
        this._serviceContentManager
          .editContentItem(this.myForm.value)
          .subscribe((res) => this._customLogger.logDebug('respuesta', res));
        this._clientNotification.openNotification(
          'Contenido editado con exito!',
          'success'
        );
      } else if (!this.contentItem) {
        this._customLogger.logDebug(
          'OnSubmitForm, createContent()',
          this.myForm.value
        );
        this._serviceContentManager
          .createContentItem(this.myForm.value)
          .subscribe((res) => this._customLogger.logDebug('respuesta', res));
        this._clientNotification.openNotification(
          'Contenido creado con exito!',
          'success'
        );
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
