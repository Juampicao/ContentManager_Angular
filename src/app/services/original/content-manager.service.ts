import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ErrorContentManagerService } from 'src/app/error/ErrorContentManagerService';
import { ContentItem } from 'src/app/model/ContentItem';
import { ContentItemFilter } from 'src/app/model/ContentItemFilter';
import { Duration } from 'src/app/model/Duration';
import { IContentType } from 'src/app/model/Interfaces';
import { CustomLogger } from 'src/app/utils/CustomLogger';
import { IContentManagerService } from '../interface/IContentManagerService';


const customLogger = new CustomLogger();

@Injectable({
  providedIn: 'root'
})
  
export class ContentManagerService implements IContentManagerService{

  contentItemList: ContentItem[] = [
  new ContentItem(1, "Original JS", "lo mejor de esto", IContentType.Video, ["Javascript"], new Duration(0, 5), 2, new Date("2022-03-25")),
  new ContentItem(2, "Programacion", "lo mejor de esto", IContentType.Article, ["Javascript"], new Duration(0,5), 3, new Date("1970-03-25")),
  new ContentItem(3, "Python", "lo mejor de esto", IContentType.Video, ["Marketing"], new Duration(0,5), 4, new Date("2010-03-25")),
  new ContentItem(4, "Angular", "lo mejor de esto", IContentType.Web, ["Data Science"], new Duration(0,5), 5, new Date("2009-03-25")),
  new ContentItem(5, "Marketing", "lo mejor de esto", IContentType.Video, ["Javascript"], new Duration(0,2), 5, new Date("1970-03-25")),
  new ContentItem(6, "Javascript", "lo mejor de esto", IContentType.Pdf, ["Marketing"], new Duration(0,1,5), 2, new Date("2005-03-25")),
  new ContentItem(7, "React", "lo mejor de esto", IContentType.Video, ["Javascript"], new Duration(0,5), 3, new Date("2020-03-25")),
  new ContentItem(8, "Javascript", "lo mejor de esto", IContentType.Video, ["Javascript"], new Duration(0,6), 4, new Date("1970-03-25")),
  new ContentItem(9, "Data Science", "lo mejor de esto", IContentType.Video, ["Data Science"], new Duration(0,5), 5, new Date("1999-03-25")),
  
];


//Todo  Esta linea si completo el contentType, me da error en el id  
// { id: 4, title: "Javascript",  duration: new Duration(1), contentType: IContentType, description: "desc 1", tags: ["React"], fechaCreacion: new Date("2022-10-10"), rating : 1 }, 

  
//Todo  Lista Vieja. No anda si cambio ContentItem. Agregue todos los atributos. Problema ID
//   contentItemList : ContentItem[] =  [
//   { title: "Javascript", id: 4, duration: 30, contentType: "Web", description: "desc 1", tags: ["React"], fechaCreacion: new Date("2022-10-10"), rating : 1 },
//   { title: "Java", id: 6, duration: 2, contentType: "Article", description: "desc 2", tags: ["java"] , fechaCreacion: new Date(), rating: 2},
//   { title: "Programacion", id: 7, duration: 3, contentType: "Article", description: "desc 3", tags: ["Programacion"], fechaCreacion: new Date(), rating: 3},
//   { title: "Javascript", id: 9, duration: 50, contentType: "Article", description: "desc 4", tags: ["Javascript"], fechaCreacion: new Date(), rating: 4},
//   { title: "Python", id: 11, duration: 35, contentType: "Pdf", description: "desc 5", tags: ["Python"], fechaCreacion: new Date(), rating: 5},
//   { title: "Marketing", id: 12, duration: 23, contentType: "Video", description: "desc 6", tags: ["Marketing"], fechaCreacion: new Date(), rating: 4 },
//   { title: "Data Science", id: 99, duration: 15, contentType: "Web", description: "desc 7",tags: ["Data Science"],fechaCreacion: new Date(), rating:3 }
// ];
  

  constructor(
    private _customLogger: CustomLogger
  ) { }
  getUniqueContentTypes(): IContentType[] {
    throw new Error('Method not implemented.');
  }
  getUniqueTags(): string[] {
    throw new Error('Method not implemented.');
  }
  getJsonList(): void {
    throw new Error('Method not implemented.');
  }
  createContentItem(contentItem: ContentItem): Observable<ContentItem> {
    throw new Error('Method not implemented.');
  }
  editContentItem(contentItem: ContentItem): Observable<ContentItem> {
    throw new Error('Method not implemented.');
  }
  
  getContentsItemsByFilter(filter: ContentItemFilter): ContentItem[] {
    throw new Error('Method not implemented.');
  }
  getContentItemsByFilterPaged(filter: ContentItemFilter, page: number, limit: number, order?: any): ContentItem[] {
    throw new Error('Method not implemented.');
  }
  getTotalCuantityContentItems(filter: ContentItemFilter): number {
    throw new Error('Method not implemented.');
  }
  
   /**
  * @returns todos los contentItems desde la apiUrl.
  */
  getAllContentItems(): Observable<ContentItem[]> {
    try {
      let response: ContentItem[] = this.contentItemList.slice();       
      this._customLogger.logDebug(`[ContentManagerService] => getContentItemById => contentItem=${(JSON.stringify(response, null, 4))}`);
      return of(response);
    } catch (error) {
     this._customLogger.logError("[ContentManagerService], getContentItemById", error)
      throw new ErrorContentManagerService(`[ContentManagerService], getContentItemById => ${error} `)
    }
  }

  /**
  * @param id 
  * @returns ContenItem por id.
  */
  getContentItemById(id: number): Observable<ContentItem> {
    try {
      const response = this.contentItemList.find(({ id }) => id === id);
      this._customLogger.logDebug(`ContentManager , getContentByID => contentItem=${(JSON.stringify(response, null, 2))}`);
      if (response) {  
        return of(response);       
      } else {
        throw new Error(`No se encontro ningun contentItem con este id=${id}`); 
      }
    } catch (error) {
      this._customLogger.logError("[ContentManager], getContentByid", error)
      throw new ErrorContentManagerService(`getContentByid=> ${error} `)
    }
  }

  
  /**
  * Retorna el metodo getContentItemByID para este sprint.
  * @param id 
  * @returns contentItem
  */
  deleteContentItem(id: number): Observable<ContentItem>{
    try {
      const response = this.contentItemList.find(({ id }) => id === id);
      this._customLogger.logDebug(`ContentManager , deleteContentItem => Borrando el contentItem=${(JSON.stringify(response, null, 2))}`);
    
      if (response) {  
        return of(response);       
      } else {
        throw new Error(`ContentManager , deleteContentItem => No se encontro ningun contentItem con este id=${id}`); 
      }
    } catch (error) {
      this._customLogger.logError("[deleteContentItem]", error)
      throw new ErrorContentManagerService(`ContentManager , deleteContentItem Error=> ${error} `)
    }
  }

}


  // Todo prueba transformar a observable.
  // getAllContentObservable2(): Observable<ContentItem[]>{
  //   return new Observable<ContentItem[]>;  
  // }