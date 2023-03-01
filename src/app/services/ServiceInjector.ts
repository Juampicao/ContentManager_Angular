import { Injectable } from '@angular/core';
import { CustomLogger } from '../utils/CustomLogger';
import { IContentManagerService } from './interface/IContentManagerService';
import { ContentManagerServiceMock } from './mock/content-manager-service-mock.service';
import { ContentManagerService } from './original/content-manager.service';


export interface PropsSelectServiceInjector{
  type: "original"| "mock"
}

export interface PropsSelectDatabaseInjector{
  type: "objetos"| "json"
}


@Injectable({
  providedIn: 'root'
})

  
export class ServiceInjector {

  private static _service: IContentManagerService; 

  /**
  * Funcion interna de testing: Levanto una instancia. Inyeccion de dependencias.
  * @returns service
  * @param service: PropsSelectServiceInjector = "original" || "mock"
  */
  static selectService(service: PropsSelectServiceInjector["type"] = "original"): IContentManagerService {
    if (service === "original") {
      
      return new ContentManagerService(new CustomLogger());

    } else if (service === "mock") {
      
      if (!this._service) {
        this._service = new ContentManagerServiceMock(new CustomLogger());
      }

      return this._service;
    } else {
        return new ContentManagerServiceMock(new CustomLogger());
      
    }
  }


}
