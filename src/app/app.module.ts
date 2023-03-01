import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//* Componentes internos core
import { MyButtonComponent } from './components/button/button/my-button.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ContentItemListComponent } from './components/content-item-list/content-item-list.component';
import { EditContentItemComponent } from './components/edit-content-item/edit-content-item.component';
import { FormularioContentItemComponent } from './components/forms/formulario-content-item/formulario-content-item.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SpinerComponent } from './components/spiner/spiner/spiner.component';
import { VideoPlayComponent } from './components/video-play/video-play/video-play.component';
import { ViewContentItemComponent } from './components/view-content-item/view-content-item.component';
import { MyErrorHandlerService } from './error/service/my-error-handler.service';
import { CustomLogger } from './utils/CustomLogger';

//* Provide Interceptor & Error
import { ErrorComponent } from './error/error/error.component';
import { InterceptorService } from './interceptors/interceptor.service';


//* Componentes angular Material.
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VideoPlayTwoComponent } from './components/video-play/video-play-two/video-play-two.component';


@NgModule({
    declarations: [
        AppComponent,
        ContentItemListComponent,
        ViewContentItemComponent,
        EditContentItemComponent,
        SpinerComponent,
        ConfirmDialogComponent,
        LoginComponent,
        LayoutComponent,
        NavbarComponent,
        FooterComponent,
        ErrorComponent,
        FormularioContentItemComponent,
        MyButtonComponent,
        VideoPlayComponent,
        VideoPlayTwoComponent,
    ],
    providers: [
        ErrorComponent,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        },
        { provide: ErrorHandler, useClass: MyErrorHandlerService },
        { provide: CustomLogger, useClass: CustomLogger }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSortModule,
        FormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatCardModule,
        MatMenuModule,
        MatDatepickerModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonToggleModule
    ]
})
export class AppModule { }
