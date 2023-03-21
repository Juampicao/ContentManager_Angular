import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyLocalStorageService {
  constructor() {}

  // Método para guardar un valor en el localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Método para obtener un valor del localStorage
  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Método para eliminar un valor del localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  set cardNumberColumns(cardNumberColumns: number) {
    this.setItem('cardNumberColumns', cardNumberColumns);
  }

  set viewPrefered(viewPrefered: string) {
    this.setItem('viewPrefered', viewPrefered);
  }

  get cardNumberColumns() {
    return this.getItem('cardNumberColumns');
  }

  get viewPrefered() {
    return this.getItem('viewPrefered');
  }
}
