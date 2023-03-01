// import { Component, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { MyErrorHandlerService } from 'src/app/error/service/my-error-handler.service';
// import { ContentItem } from 'src/app/model/ContentItem';
// import { ContentItemFilter } from 'src/app/model/ContentItemFilter';
// import { Duration } from 'src/app/model/Duration';
// import { contentItemEmpty, IContentItemRating, IContentType, IOrderArray } from 'src/app/model/Interfaces';
// import { IContentManagerService } from 'src/app/services/interface/IContentManagerService';
// import { ServiceInjector } from 'src/app/services/ServiceInjector';
// import { CustomLogger } from 'src/app/utils/CustomLogger';
// import { PageIterator } from 'src/app/utils/pageIterator/PageIterator';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
// import { FormularioContentItemComponent } from '../forms/formulario-content-item/formulario-content-item.component';
// import { ViewContentItemComponent } from '../view-content-item/view-content-item.component';



// export interface FilterValues {
//   titleOrDescription: string;
//   ratingSince: IContentItemRating;
//   ratingUntil: IContentItemRating;
//   tags: string[];
//   contentType: IContentType;
//   dateSince: Date;
//   dateUntil: Date;
//   durationSince: Duration;
//   durationUntil: Duration;

//   // durationSince: {
//   //   hours: number,
//   //   minutes?: number,
//   //   seconds?: number
//   // }

//   // durationUntil: {
//   //   hours: number,
//   //   minutes?: number,
//   //   seconds?: number
//   // }
  
// }

// @Component({
//   selector: 'app-content-item-list',
//   templateUrl: './content-item-list.component.html',
//   styleUrls: ['./content-item-list.component.css']
// })
  


// export class ContentItemListComponent {
  
//   public contentItem: ContentItem = contentItemEmpty;
//   public isLoading: boolean = true;
//   public displayedColumns: string[] = ['title', 'duration', 'contentType', 'id', 'rating', 'fecha',  'tags',  'funciones'];
//   public dataSource = new MatTableDataSource<ContentItem>([]);
//   // public dataSource = new MatTableDataSource<PageIterator>([]); // Todo prueba con pageIterator.

//   private _serviceContentManager!: IContentManagerService // Typescript Solution Vanilla
  
//   // Pagination defaultValues
//   public limitPageDefault: number = 10;
//   public initialPageDefault: number = 1;
//   public currentPageDefault: number = 1; 
//   public totalPagesDefault: number = 10; 
//   public totalItemsLengthDefault: number = 10; 

//   // Pagination
//   public limitPage: number = this.limitPageDefault;
//   public initialPage: number = this.initialPageDefault
//   public currentPage: number = this.currentPageDefault;
//   public totalPages: number = this.totalPagesDefault;
//   public totalItemsLength: number = this.totalItemsLengthDefault;

//   // GlobalFilter
//   private GlobalFilter: ContentItemFilter = new ContentItemFilter();

//   // Form
//   public myForm!: FormGroup;
    
//   public isResultEmpty: boolean = false; 
//   public noResultsFounded : string = "No hay resultados para estos filtros"
//   public pageIterator: PageIterator = new PageIterator(this._serviceContentManager, this.GlobalFilter, this.limitPage, IOrderArray.ASC); 
  
//   // Input Options
//   public ratingOptions: IContentItemRating[] = [IContentItemRating.Void, IContentItemRating.Uno, IContentItemRating.Dos, IContentItemRating.Tres, IContentItemRating.Cuatro, IContentItemRating.Cinco];
 
//   // public tagsOptions: string[] = ["Javascript", "React", "Marketing", "Programacion", "typescript"]; / opciones estaticas.
//   public tagsOptions: string[] = [];
//   public tagsOptionsVoid = []; 

//   // public contentTypeOptions: IContentType[] = [IContentType.Article, IContentType.Pdf, IContentType.Video, IContentType.Web]; //  opciones estadicas
//   public contentTypeOptions: IContentType[] = [];
//   public contentTypeOptionVoid: IContentType = IContentType.Void; 

//   public hours = [1, 2, 3];
//   public minutes = [1, 2, 3, 4, 5, 10, 15,  20, 25, 30, 45, 55, 60 , 75, 90, 120, 150, 180];
 
//   // Filter

// public filterValues: FilterValues = {
//   titleOrDescription: "",
//   ratingSince: 1,
//   ratingUntil: 5,
//   tags: this.tagsOptionsVoid,
//   contentType: this.contentTypeOptionVoid,
//   dateSince: new Date("2001 10 10"),
//   dateUntil: new Date ("2023 10 10"),
//   // durationSince: {
//   //   hours: 1,
//   //   minutes: 40,
//   //   seconds: 0
//   // },
//   // durationUntil: {
//   //   hours: maxDurationUntil.getHours(),
//   //   minutes: maxDurationUntil.getMinutes(),
//   //   seconds: maxDurationUntil.getSeconds(),
//   // }
//     durationSince: new Duration(0,15,0),
//     durationUntil: new Duration(0,75,0),
// };
  
//   // public filterInitialValues: FilterValues = {
//   //   titleOrDescription: "",
//   //   ratingSince: 1,
//   //   ratingUntil: 5,
//   //   tags: [],
//   //   contentType: IContentType.Void,
//   //   dateSince: minFechaCreacionSince,
//   //   dateUntil: maxFechaCreacion,
//   //   durationSince: {
//   //     hours: 0,
//   //     minutes: 0,
//   //     seconds: 0
//   //   },
//   //   durationUntil: {
//   //     hours: 3,
//   //     minutes: 0,
//   //     seconds: 0
//   //   }
//   //    // durationSince: new Duration(0,0,0),
//   //   // durationUntil: maxDurationUntil,

//   // };
  
  



//   //? Mostrar en html initial values
//   // public InitialValuesJSON = JSON.stringify(this.filterInitialValues); 
//   public FilterValuesJSON = JSON.stringify(this.filterValues); 
//   public FormActualValuesJson = JSON.stringify(this.myForm);


//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(
    
//     private _dialog: MatDialog,
//     private _handleError: MyErrorHandlerService,
//     private _customLogger: CustomLogger,
//     private formBuilder: FormBuilder
//   ) {
//     this._serviceContentManager = ServiceInjector.selectService("mock"); // Solucion Typescript Vanilla
//   }
 
 
//   ngOnInit() {
//     try {
//       this.initialForm();
//       this.tagsOptions = this._serviceContentManager.getUniqueTags();
//       this.contentTypeOptions = this._serviceContentManager.getUniqueContentTypes();
//       this._customLogger.logDebug(`Etiquetas Unicas: ${this.tagsOptions}, Content Types Unicos ${this.contentTypeOptions}`)
//       // this.probarFecha()
//     } catch (error) {
//       this._handleError.customError(error, "ngOnInit", `Hubo un error en el ngOnInit(), ${error}`)
      
//     }
//   }

//   ngAfterViewInit() {
//     try {
//       this.createPageIterator();
//       this.applyFilterGeneral();
//     } catch (error) {
//       this._handleError.customError(error, "ngAfterViewInit()", `Cargar la pantalla, error: ${error}`)
//     }
//   }

//   // - - -  - -- - -  - - -  - Inicio Formulario - - -  - -- - -  - - -  -

//   /**
//    * Initial values form
//    */
//   initialForm() {
//     try {
//       const { titleOrDescription, ratingSince, ratingUntil, tags, contentType, dateSince, dateUntil, durationSince, durationUntil } = this.filterValues;

//     this.myForm = this.formBuilder.group({
//       titleOrDescription: [titleOrDescription, ],
//       ratingSince: [ratingSince, ],
//       ratingUntil: [ratingUntil, ],
//       tags: [tags],
//       contentType: [contentType,],
//       dateSince: [dateSince.toISOString().substring(0, 10), ],
//       dateUntil: [dateUntil.toISOString().substring(0, 10), ],
//       durationSince: [durationSince.minutes, ],
//       durationUntil: [durationUntil.minutes, ],
//       // durationSince: this.formBuilder.group({
//       //   hours: [durationSince.hours, ],
//       //   minutes: [durationSince.minutes,],
//       //   seconds: [durationSince.hours,],
//       // }),
//       // durationUntil: this.formBuilder.group({
//       //   hours: [durationUntil.hours, ],
//       //   minutes: [durationUntil.minutes,],
//       //   seconds: [durationUntil.seconds,],
//       // })
//     });
//     } catch (error) {
//       this._handleError.customError(error, "initialForm", `Hubo un error en el initialForm(), ${error}`)
//     }
    
//   }
//   /**
//    * Reset form to initial Values.
//    */
//   resetForm() {
//     this._customLogger.logDebug("resetForm", `Viejo ${JSON.stringify(this.myForm.value)}`)
//     this.filterValues.titleOrDescription = "";
//     this.initialForm()
//     this._customLogger.logDebug("resetForm", `Nuevo ${JSON.stringify(this.myForm.value)}`)
//   }

//   /**
//    * Submit Form active the new filters.
//    * @param form 
//    */
//   onSubmit(form: FormGroup) {
//     this._customLogger.logDebug("OnSubmitForm", this.myForm.value)
//     // this.createPageIterator()
//     this.applyFilterGeneral()
//   }

 

//   // - - -  - -- - -  - - -  -  Fin Formulario - - -  - -- - -  - - -  -
  
//   private createPageIterator() {
//     this.limitPage = this.limitPageDefault;
//     this.currentPage = this.currentPageDefault;
//     this.pageIterator = new PageIterator(this._serviceContentManager, this.GlobalFilter, this.limitPage, IOrderArray.ASC); 
//     this.totalPages = this.pageIterator.getTotalPageNumber();
//     this.totalItemsLength = this.pageIterator.getTotalCuantityContentItems();
//   }

  
//   // Button "ver Contenido"
//   // onViewAllContent() {
//   //   let response = this._serviceContentManager.getAllContentItems().subscribe(data => {
//   //     this.dataSource = new MatTableDataSource(data)
//   //     this.dataSource.paginator = this.paginator;
//   //     this.isLoading = false
//   //     this._customLogger.logDebug(`onViewAllContent`, data)
//   //   })
//   //   this._customLogger.logDebug("onViewAllContent, contentItemList => ", (JSON.stringify(response, null, 2)));
//   // }
  
  
//   // Button "Probar Lista Filtrada"
  
//   // onFilterList(page: number = this.initialPage, limit: number = this.limitPage) {
   
//   //   let filter = new ContentItemFilter();
//   //   filter.titleOrDescription = "Data";
    
//   //   let response = this._serviceContentManager.getContentItemsByFilterPaged(filter, page, limit)

//   //   let responseLengthLogger = `Coincencias encontradas ${response.length}`;
//   //   let filtroLogger = `Filtro: ${filter.toString()}.\n\n La Lista filtrada=  Pages:${page} & limit:${limit}`
    
//   //   this._customLogger.logDebug(`onFilterList`,`${filtroLogger}\n\n ${responseLengthLogger}\n Respuesta= ${response}`)
//   //   alert(`${filtroLogger}\n\n ${responseLengthLogger}\n Respuesta= ${response}`)
//   // }



//   // /**
//   // * Forms Input
//   //  * Filter by original service mock filtering
//   //  */
//   // applyFilterGeneral() {
   
//   //   try {

//   //     let page = this.initialPage
//   //     let limit = this.limitPage;
//   //     let filter: ContentItemFilter = this.GlobalFilter;
      
//   //     //? Prueba con formulario Reactivo.
//   //     // if ( this.myForm.value.titleOrDescription && this.myForm.value.titleOrDescriptionn.length < 3 ) {
//   //     //   this._customLogger.logDebug(`applyFilter debe ser mayor a 3. ${this.filtertitleOrDescription}`  );
//   //     //   return;
//   //     // }
      
//   //     filter.titleOrDescription = this.myForm.value.titleOrDescription;
//   //     filter.ratingSince =  this.myForm.value.ratingSince;
//   //     filter.ratingUntil = this.myForm.value.ratingUntil;
//   //     filter.tags = this.myForm.value.tags
//   //     filter.contentType = this.myForm.value.contentType
    
     
//   //     let response = this._serviceContentManager.getContentItemsByFilterPaged(filter, page, limit)
//   //     let responseLengthLogger = `Coincencias encontradas ${response.length}`;
//   //     let filtroLogger = `Filtro: ${JSON.stringify(filter.toString(),null,2)} .\n\n La Lista filtrada=  Pages:${page} & limit:${limit}`
      
//   //     this._customLogger.logDebug(`applyFilterGeneral` , `${filtroLogger}\n\n ${responseLengthLogger}\n Respuesta= ${JSON.stringify(response, null,2)}`)

//   //     this.dataSource = new MatTableDataSource(response)
//   //   } catch (error) {
//   //     this._handleError.customError(error, "applyFilterGeneral", "Filtro de busqueda. Prueba denuevo")
//   //   }
//   // }

 
//   // Pagination
  

 
//   /**
//   * Filter by original service mock filtering
//   */
//   // applyFilterGeneral() {

//   //   //? Valores de this.filterValues
//   //   // const { titleOrDescription, ratingSince, ratingUntil,  tags, contentType, dateSince,dateUntil, durationSince, durationUntil,
//   //   // } = this.filterValues
    


//   //   try {
//   //     // this._customLogger.logDebug(`[applyFilterGeneral] GlobalFilter: ${this.GlobalFilter.toString()}` )

//   //     //! Validations Filters => Saque el error de ContentItemFilter.
//   //     // if ( titleOrDescription && titleOrDescription.length < 3 ) {
//   //     //   this._customLogger.logDebug(`applyFilter debe ser mayor a 3. ${titleOrDescription}`  );
//   //     //   return;
//   //     // }

//   //     // GlobalFilter
//   //     // if (titleOrDescription) {
//   //     //   this.GlobalFilter.titleOrDescription = titleOrDescription.trim();
//   //     // }

//   //     // if (ratingSince) {
//   //     //   this.GlobalFilter.ratingSince = ratingSince;
//   //     // }

//   //     // if (ratingUntil) {
//   //     //   this.GlobalFilter.ratingUntil = ratingUntil;
//   //     // }

//   //     // if (this.filterTags) {
//   //     //   this.GlobalFilter.tags = this.filterTags;
//   //     // }

//   //     // if (contentType) {
//   //     //   this.GlobalFilter.contentType = contentType;
//   //     // }

//   //     // if (this.filterDateSince) {
//   //     //   this.GlobalFilter.fechaCreacionSince = this.filterDateSince;
//   //     // }

//   //     //  if (this.filterDateUntil) {
//   //     //   this.GlobalFilter.fechaCreacionUntil = this.filterDateUntil;
//   //     //  }
      
//   //     // if (this.filterDurationSince) {
//   //     //   this.GlobalFilter.durationSince = this.filterDurationSince
//   //     // };

//   //     // if (this.filterDurationUntil) {
//   //     //   this.GlobalFilter.durationUntil = this.filterDurationUntil;
//   //     // }

//   //     this.GlobalFilter.titleOrDescription = titleOrDescription;
//   //     this.GlobalFilter.ratingSince = ratingSince
//   //     this.GlobalFilter.ratingUntil = ratingUntil
//   //     this.GlobalFilter.tags = tags
//   //     this.GlobalFilter.contentType = contentType
//   //     this.GlobalFilter.fechaCreacionSince = dateSince
//   //     this.GlobalFilter.fechaCreacionUntil = dateUntil
      
//   //     // Duration Since
//   //     this.GlobalFilter.durationSince = durationSince
//   //     // this.GlobalFilter.durationSince = new Duration(0,durationSince.minutes,0)
//   //     // this.GlobalFilter.durationSince = new Duration(durationSince.hours, durationSince.minutes, durationSince.seconds);

//   //     // Duration Until
//   //     this.GlobalFilter.durationUntil = durationUntil;
//   //     // this.GlobalFilter.durationUntil = new Duration(0,durationUntil.minutes,0)
//   //     // this.GlobalFilter.durationUntil = new Duration(durationUntil.hours, durationUntil.minutes, durationUntil.seconds);
      

//   //     let page = this.initialPage
//   //     let limit = this.limitPage;
//   //     let filter : ContentItemFilter = this.GlobalFilter;
      
//   //     let response = this._serviceContentManager.getContentItemsByFilterPaged(filter, page, limit)
//   //     let responseLengthLogger = `Coincencias encontradas ${response.length}`;
//   //     let filtroLogger = `Filtro: ${JSON.stringify(filter.toString(),null,2)} .\n\n La Lista filtrada=  Pages:${page} & limit:${limit}`
      
//   //     this._customLogger.logDebug(`applyFilterGeneral` , `${filtroLogger}\n\n ${responseLengthLogger}\n Respuesta= ${JSON.stringify(response, null,2)}`)

//   //     this.dataSource = new MatTableDataSource(response)
//   //   } catch (error) {
    
//   //     //? 1° Si no hay resultados. (si es instanceOf NoHayResultadosError)
//   //     this.isResultEmpty = true;
      
//   //     // Vaciar tabla sin resultados
//   //     this.dataSource = new MatTableDataSource<ContentItem>([]);

//   //     // Reiniciar Filtros
//   //     this.resetForm();

//   //     // this._customLogger.logError("contentItemList, ApplyFilter", error)

//   //     //? 2 Otro tipo de error, tira un alert.
//   //     return this._handleError.customError(error,  "applyFilterGeneral", `\nel filtro de busqueda. Prueba denuevo.\n Filtro Utilizado:\n ${JSON.stringify(this.GlobalFilter)}\n\n ${error}`)
//   //     // this._handleError.customError(error, "applyFilterGeneral", `Filtro de busqueda. Prueba denuevo Filtro: ${JSON.stringify(this.GlobalFilter)}`)

//   //   }
   
//   // }
  



//   probarFecha() {
//     const fechaInitialValues = this.filterValues.dateSince;
//     const fechaNormalForm = this.myForm.value.dateSince

//     this._customLogger.logDebug("fechaInitialValues", fechaInitialValues)

//     this._customLogger.logDebug("fechaNormalForm", new Date(fechaNormalForm).getTime())

//   }

// /**
//   * Filter by original service mock filtering. MYFORM
//   */
//   applyFilterGeneral() {
//     this.createPageIterator()
    
//     //? Valores de this.myForm
//     const { titleOrDescription, ratingSince, ratingUntil,  tags, contentType, dateSince,dateUntil, durationSince, durationUntil,
//     } = this.myForm.value
    

//     try {

//       this.GlobalFilter.titleOrDescription = titleOrDescription;
//       this.GlobalFilter.ratingSince = ratingSince
//       this.GlobalFilter.ratingUntil = ratingUntil
//       this.GlobalFilter.tags = tags
//       this.GlobalFilter.contentType = contentType
//       this.GlobalFilter.fechaCreacionSince = new Date(dateSince);
//       this.GlobalFilter.fechaCreacionUntil = new Date(dateUntil);
      
//       // Duration Since
//       // this.GlobalFilter.durationSince = new Duration(0,22,0)
//       this.GlobalFilter.durationSince = new Duration(0,durationSince,0)
//       // this.GlobalFilter.durationSince = new Duration(durationSince.hours, durationSince.minutes, durationSince.seconds);

//       // Duration Until
//       this.GlobalFilter.durationUntil = new Duration(0,durationUntil,0)
//       // this.GlobalFilter.durationUntil = new Duration(durationUntil.hours, durationUntil.minutes, durationUntil.seconds);
      

//       let page = this.initialPage
//       let limit = this.limitPage;
//       let filter : ContentItemFilter = this.GlobalFilter;
      
//       //? 1° Servicio Mock filtrado
//       // let response = this._serviceContentManager.getContentItemsByFilterPaged(filter, page, limit);
//       //? 2° Page Iterator.
//       // let response = new PageIterator(this._serviceContentManager, filter, limit).getFirstPage()
//       //? 3° Page iterator local ya creado.
//       let response = this.pageIterator.getFirstPage() // Todo controlar que exista.
//       // let response = this.pageIterator.getNextPage()

//       let responseLengthLogger = `Coincencias encontradas ${response.length}`;
//       let filtroLogger = `Filtro: ${JSON.stringify(filter.toString(),null,2)} .\n\n La Lista filtrada=  Pages:${page} & limit:${limit}`
      
//       this._customLogger.logDebug(`applyFilterGeneral` , `${filtroLogger}\n\n ${responseLengthLogger}\n Respuesta= ${JSON.stringify(response, null,2)}`)

//       this.dataSource = new MatTableDataSource(response)

//       this.isResultEmpty = false;
//     } catch (error) {
    
//       //? 1° Si no hay resultados. (si es instanceOf NoHayResultadosError)
//       this.isResultEmpty = true;
      
//       // Vaciar tabla sin resultados
//       this.dataSource = new MatTableDataSource<ContentItem>([]);

//       // Reiniciar Filtros
//       this.resetForm();

//       // Si no hay resultados, es una cosa. Si es error es otra.
//       // if (error instanceof NoHayResultadosError) {
//       // }
      
//       return this._handleError.customError(error,  "applyFilterGeneral", `\nel filtro de busqueda. Prueba denuevo.\n Filtro Utilizado:\n ${JSON.stringify(this.GlobalFilter)}\n\n ${error}`)

//     }
   
//   }

  
//   pageChanged(event: PageEvent) {
//     this._customLogger.logDebug("pageChanged", event)


//     // this.pageIterator.getLastPage();
//     // this.pageIterator.getNextPage();
//     // this.pageIterator.getPreviousPage();
//     //? Previous Page. Si < previousPage
//     // let previuosPage = this.pageIterator.getPreviousPage()
//     //   this.dataSource = new MatTableDataSource(previuosPage);
    
//     //? Next Page. Si > nextPage.
//     // let nextPage = this.pageIterator.getNextPage(); 
//     // this.dataSource = new MatTableDataSource(nextPage); 

//     // this.limitPage = event.pageIndex * event.pageSize;
//     // this.initialPage = event.pageSize;

//     // this.limitPage = event.pageSize;
//     // this.initialPage = 1

//     // this.limitPage = event.pageSize * event.pageIndex
//     // this.initialPage = this.initialPage

//     // this.limitPage = this.limitPage;
//     // this.initialPage = 1
    
//     // this.limitPage = this.limitPage;
//     // this.initialPage = this.initialPage;

//     // this.applyFilterGeneral();
//     this.dataSource.paginator = this.paginator;
//   }


//   /**
//   * Abrir el formulario para crear un nuevo contenido.
//   */
//   onAddContent() {
//     this._customLogger.logDebug("","abriendo modal de agregar contenido...")
//   }


//   /**
//   * Abre modal de viewComponent para visualizar el contenido.
//   * @param contentItem 
//   */
//   onViewContent(contentItem: ContentItem) {
//     this._customLogger.logDebug("contentItemList => onViewContent", contentItem)
//     const dialogRef = this._dialog.open(ViewContentItemComponent, {
//       data: contentItem
//     })
//   }


//   /**
//   * Abrir el formulario para editar un contenido.
//   * @param contentItem 
//   */
//   onCreateContent() {
//     this._customLogger.logDebug("onCreateContent, ViewContent-Item", )
//     const dialogRef = this._dialog.open(FormularioContentItemComponent, {
//       data: "",
//     })
//   }


//   /**
//   * Abre un modal. Si confirma elimina el contentItem.
//   * @param id: ID
//   * @return 
//   */
//   onDeleteContent(id: number)  {
//     const dialogRef = this._dialog.open(ConfirmDialogComponent, {
//       data: `¿Estas seguro de eliminar el contenido: ${id}?`
//     })
   
//     dialogRef.afterClosed().subscribe(response => {
//       if (response) {
//         this._customLogger.logDebug("ContentItemList, [onDeleteContent]", "dialog response =>", response)
//         this._serviceContentManager.deleteContentItem(id);
//       } else {
//         this._customLogger.logDebug("ContentItemList, [onDeleteContent]", "dialog response =>", response)
//       }
//     })
//   }


// }



