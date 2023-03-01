<div class="flex text-center my-2">

        <!-- Filter Title -->
        <div>
            <mat-label>Title Or Description</mat-label>
            <input class="border border-black  border-4" (keyup)="applyFilterGeneral()"
                [(ngModel)]="filtertitleOrDescription">
        </div>


        <!-- Filter Rating -->
        <mat-label>Rating</mat-label>
        <div>
            <mat-form-field appearance="fill">
                <mat-label>Desde</mat-label>
                <mat-select (selectionChange)="applyFilterByRating()" [(ngModel)]="filterRatingSince">
                    <mat-option *ngFor="let ratingOption of ratingOptions" [value]="ratingOption">
                        {{ratingOption}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
        </div>

        <div>
            <mat-form-field appearance="fill">
                <mat-label>Hasta</mat-label>
                <mat-select (selectionChange)="applyFilterByRating()" [(ngModel)]="filterRatingUntil">
                    <mat-option *ngFor="let number of ratingOptions" [value]="number">
                        {{number}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
        </div>


        <!-- Filter Tags -->
        <div>
            <mat-form-field appearance="fill">
                <mat-label>Tags</mat-label>
                <mat-select (selectionChange)="applyFilterByTags()" [(ngModel)]="filterTags">
                    <mat-option *ngFor="let tag of tagsOptions" [value]="tag">
                        {{tag}}
                    </mat-option>
                </mat-select>
            </mat-form-field>

        </div>

        <!-- Filter Type -->
        <mat-form-field appearance="fill">
            <mat-label>Content Type</mat-label>
            <mat-select (selectionChange)="applyFilterByContentType()" [(ngModel)]="filterContentType">
                <mat-option *ngFor="let contentType of contentTypeOptions" [value]="contentType">
                    {{contentType}}
                </mat-option>
            </mat-select>
        </mat-form-field>>

    </div>

<!-- TYPESCRIPT -->
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