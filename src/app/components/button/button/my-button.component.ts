import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css']
})
export class MyButtonComponent implements OnInit {
  
  @Input() type: string = 'button';
  @Output() clicked: EventEmitter<any> = new EventEmitter();

  @Input() class: string = 'searchFilterButton';
  @Input() text: string = ''; // nueva propiedad de entrada
  @Input() attrs: Record<string, any> = {}; // nueva propiedad de entrada

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
  this.clicked.emit();
}

}
