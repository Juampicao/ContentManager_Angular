import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MyErrorHandlerService } from 'src/app/error/service/my-error-handler.service';
import { MyClientNotificationService } from 'src/app/services/clientNotification/my-client-notification.service';
import { UserPreferencesComponent } from '../../user-preferences/user-preferences.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  constructor(
    private _errorFunction: MyErrorHandlerService,
    private _dialog: MatDialog,
    private _clientNotification: MyClientNotificationService
  ) {}

  ngOnInit(): void {}

  onErrorFunction() {
    // this._errorFunction.errorFunctionNotImplemented('Navbar Menu');
    this._clientNotification.functionNotImplemented();
  }

  onEditPreferences() {
    this._dialog.open(UserPreferencesComponent);
  }
}
