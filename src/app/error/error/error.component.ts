import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent  {

  constructor(
    private _dialog: MatDialog,
    
    @Inject(MAT_DIALOG_DATA) 
    public message: string
  ) { }



}
