import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MyErrorHandlerService } from 'src/app/error/service/my-error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  constructor(
    private _errorFunction : MyErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  onErrorFunction() {
    this._errorFunction.errorFunctionNotImplemented("Navbar Menu")
  }

}
