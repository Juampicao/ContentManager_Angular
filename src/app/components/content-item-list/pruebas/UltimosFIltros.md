    <!-- Fitros -->
    <div class="grid grid-cols-2 text-center my-2 gap-x-3">

        <!--
        Initial Values : {{InitialValuesJSON}}
        Actual Values : {{FilterValuesJSON}}
        <div>
            <button mat-button color="accent" (click)="cambiarValor()"> Prueba</button>
        </div> -->

        <!-- Filter Title -->

        <div>
            <mat-label>Title Or Description</mat-label>
            <input class="border border-black  border-4" (keydown)="applyFilterGeneral()"
                [(ngModel)]="filterValues.titleOrDescription">
        </div>


        <!-- Filter Rating -->
        <div>
            <mat-form-field appearance="fill">
                <mat-label>Rating Desde</mat-label>
                <mat-select (selectionChange)="applyFilterGeneral()" [(ngModel)]="filterValues.ratingSince">
                    <mat-option *ngFor="let ratingOption of ratingOptions" [value]="ratingOption">
                        {{ratingOption}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
        </div>

        <div>
            <mat-form-field appearance="fill">
                <mat-label>Rating Hasta</mat-label>
                <mat-select (selectionChange)="applyFilterGeneral()" [(ngModel)]="filterValues.ratingUntil">
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
                <mat-select (selectionChange)="applyFilterGeneral()" [(ngModel)]="filterValues.tags">
                    <mat-option *ngFor="let tag of tagsOptions" [value]="tag">
                        {{tag}}
                    </mat-option>
                </mat-select>
            </mat-form-field>

        </div>

        <!-- Filter Content Type -->
        <div>
            <mat-form-field appearance="fill">
                <mat-label>Content Type</mat-label>
                <mat-select (selectionChange)="applyFilterGeneral()" [(ngModel)]="filterValues.contentType">
                    <mat-option *ngFor="let contentType of contentTypeOptions" [value]="contentType">
                        {{contentType}}
                    </mat-option>
                </mat-select>
            </mat-form-field>>
        </div>

        <!-- Filter Date -->
        <div>

            <label for="">Fecha Since</label>
            <input type="date" (change)="applyFilterGeneral()" [(ngModel)]="filterValues.dateSince">

        </div>
        <div>
            <label for="">Fecha Until</label>
            <input type="date" (change)="applyFilterGeneral()" [(ngModel)]="filterValues.dateUntil">
        </div>

        <div>
            <button mat-button color="accent" (click)="onResetFilter()"> limipiar filtros</button>
        </div>
    </div>

    <!-- Fin Filtros -->