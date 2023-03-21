import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
//? INotificationType
export interface INotificationType {
  type: 'success' | 'error' | 'info' | 'notfunction';
}
@Component({
  selector: 'app-my-snack-bar',
  templateUrl: './my-snack-bar.component.html',
  styleUrls: ['./my-snack-bar.component.css'],
})
export class MySnackBarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  defaultMessage: string = 'Exito!';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
  ngOnInit(): void {}
  public get type(): string {
    return this.data.type;
  }
}
