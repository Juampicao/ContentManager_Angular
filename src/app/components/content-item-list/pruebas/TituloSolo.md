        <!-- Title Filter -->
        <div>
            <mat-label>Title Or Description</mat-label>
            <input class="border border-black  border-4" (keyup)="applyFilterOriginalServiceMock($event)">
        </div>


        <!-- TS -->
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