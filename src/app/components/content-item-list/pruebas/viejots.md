import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MyErrorHandlerService } from 'src/app/error/service/my-error-handler.service';
import { ContentItem } from 'src/app/model/ContentItem';
import { ContentItemFilter } from 'src/app/model/ContentItemFilter';
import { contentItemEmpty, IContentItemRating, IContentType, RatingDefault } from 'src/app/model/Interfaces';
import { IContentManagerService } from 'src/app/services/interface/IContentManagerService';
import { ServiceInjector } from 'src/app/services/ServiceInjector';
import { CustomLogger } from 'src/app/utils/CustomLogger';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditContentItemComponent } from '../edit-content-item/edit-content-item.component';
import { ViewContentItemComponent } from '../view-content-item/view-content-item.component';



@Component({
  selector: 'app-content-item-list',
  templateUrl: './content-item-list.component.html',
  styleUrls: ['./content-item-list.component.css']
})
  


export class ContentItemListComponent {
  
  public contentItem: ContentItem = contentItemEmpty;
  public isLoading: boolean = true;
  public displayedColumns: string[] = ['title', 'duration', 'contentType', 'id', 'rating', 'fecha',  'tags',  'funciones'];
  public dataSource = new MatTableDataSource<ContentItem>([]);
  private _serviceContentManager!: IContentManagerService // Typescript Solution Vanilla
  
  // Pagination
  public limitPage: number = 5;
  public initialPage: number = 1;

  // Input Options
  public ratingOptions: number[] = [1, 2, 3, 4, 5];
  public tagsOptions: string[] = ["Javascript", "react", "Marketing"];
  // public contentTypeOptions: IContentType[] = [IContentType.Article, IContentType.Pdf, IContentType.Video, IContentType.Web, IContentType.Void];
  public contentTypeOptions: string[] = ["article", "web"];

  // Filter
  public filterRatingSince: IContentItemRating = RatingDefault;
  public filterRatingUntil: IContentItemRating = RatingDefault;
  public filtertitleOrDescription: string = ""; 
  public filterTags: string = "";
  public filterContentType: IContentType = IContentType.Void;


  // Form
  public myForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _handleError: MyErrorHandlerService,
    private _customLogger: CustomLogger,
    private fb: FormBuilder
  ) {
    this._serviceContentManager = ServiceInjector.selectService("mock"); // Solucion Typescript Vanilla
  }
 
  //  Forms
  ngOnInit() {
    this.myForm = this.fb.group({
      titleOrDescription: ['', ],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  onSubmit(form: FormGroup) {
   console.log(this.myForm.value)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    this.onViewAllContent();
  }
  
  // Button "ver Contenido"
  onViewAllContent() {
    let response = this._serviceContentManager.getAllContentItems().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.isLoading = false
      this._customLogger.logDebug(data)
    })
    this._customLogger.logDebug("contentItemList => [onViewAllContent]", (JSON.stringify(response, null, 2)));
  }
  
  
  // Button "Probar Lista Filtrada"
  onFilterList(page: number = 3, limit: number = 1) {
   
    let filter = new ContentItemFilter();
    filter.titleOrDescription = "Data";
    
    let response = this._serviceContentManager.getContentItemsByFilterPaged(filter, page, limit)

    let responseLengthLogger = `Coincencias encontradas ${response.length}`;
    let filtroLogger = `Filtro: ${filter.toString()}.\n\n La Lista filtrada=  Pages:${page} & limit:${limit}`
    
    this._customLogger.logDebug(`${filtroLogger}\n\n ${responseLengthLogger}\n Respuesta= ${response}`)
    alert(`${filtroLogger}\n\n ${responseLengthLogger}\n Respuesta= ${response}`)
  }


  /**
  * Title or Description
   * Filter by original service mock filtering
   * @param event EVENT
   */
  applyFilterOriginalServiceMock(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let page = 1;
    let limit = this.limitPage; 
    let filter = new ContentItemFilter();

    filter.titleOrDescription = filterValue;
    
    let response = this._serviceContentManager.getContentItemsByFilterPaged(filter, page, limit)
    let responseLengthLogger = `Coincencias encontradas ${response.length}`;
    let filtroLogger = `Filtro: ${filter.toString()}.\n\n La Lista filtrada=  Pages:${page} & limit:${limit}`
    
    this._customLogger.logDebug(`[applyFilterOriginalServiceMock] ${filtroLogger}\n\n ${responseLengthLogger}\n Respuesta= ${response}`)

    this.dataSource = new MatTableDataSource(response)

  }
 

  /**
   * Filter by original service mock filtering
   *  TODO funciona si esta solo activado. Si le agrego los otros filtros deja de andar. 
   */
  applyFilterGeneral() {

    let page = this.initialPage
    let limit = this.limitPage; 
    let filter = new ContentItemFilter()
    
    filter.ratingSince = this.filterRatingSince;
    filter.ratingUntil = this.filterRatingUntil;
    filter.titleOrDescription = this.filtertitleOrDescription; 
    // filter.tags = [this.filterTags]; 
    // filter.contentType = this.filterContentType;

    let response = this._serviceContentManager.getContentItemsByFilterPaged(filter, page, limit)
    let responseLengthLogger = `Coincencias encontradas ${response.length}`;
    let filtroLogger = `Filtro: ${filter.toString()}.\n\n La Lista filtrada=  Pages:${page} & limit:${limit}`
    
    this._customLogger.logDebug(`[applyFilterOriginalServiceMock] ${filtroLogger}\n\n ${responseLengthLogger}\n Respuesta= ${response}`)

    this.dataSource = new MatTableDataSource(response)
  }

  /**
  * Filter by original service mock filtering
  */
  applyFilterByRating() {
 
    let filter = new ContentItemFilter()
    filter.ratingSince = this.filterRatingSince;
    filter.ratingUntil = this.filterRatingUntil;
 
    let response = this._serviceContentManager.getContentItemsByFilterPaged(filter,this.initialPage, this.limitPage)

    this.dataSource = new MatTableDataSource(response)
  }

      /**
   * Filter by original service mock filtering
   */
  applyFilterByContentType() {
 
    let filter = new ContentItemFilter()
    filter.contentType = this.filterContentType;
    
    let response = this._serviceContentManager.getContentItemsByFilterPaged(filter,this.initialPage, this.limitPage)

    this.dataSource = new MatTableDataSource(response)
  }

    applyFilterByTags() {
 
    let filter = new ContentItemFilter()
    filter.contentType = this.filterContentType;
    
    let response = this._serviceContentManager.getContentItemsByFilterPaged(filter,this.initialPage, this.limitPage)

    this.dataSource = new MatTableDataSource(response)
  }


  /**
  * Abrir el formulario para crear un nuevo contenido.
  */
  onAddContent() {
    this._customLogger.logDebug("abriendo modal de agregar contenido...")
  }


  /**
  * Abre modal de viewComponent para visualizar el contenido.
  * @param contentItem 
  */
  onViewContent(contentItem: ContentItem) {
    this._customLogger.logDebug("contentItemList => [onViewContent] ", contentItem)
    const dialogRef = this._dialog.open(ViewContentItemComponent, {
      data: contentItem
    })
  }


  /**
  * Abrir el formulario para editar un contenido.
  * @param contentItem 
  */
  onEditContent(contentItem: ContentItem) {
    this._customLogger.logDebug("contentItemList =>  [onEditContent]  ", contentItem)
    const dialogRef = this._dialog.open(EditContentItemComponent, {
      data: contentItem,
    })
  }


  /**
  * Abre un modal. Si confirma elimina el contentItem.
  * @param id: ID
  * @return 
  */
  onDeleteContent(id: number)  {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: `¿Estas seguro de eliminar el contenido: ${id}?`
    })
   
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this._customLogger.logDebug("ContentItemList, [onDeleteContent], dialog response =>", response)
        this._serviceContentManager.deleteContentItem(id);
      } else {
        this._customLogger.logDebug("ContentItemList, [onDeleteContent], dialog response =>", response)
      }
    })
  }


}



