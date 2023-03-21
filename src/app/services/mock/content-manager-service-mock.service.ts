import { Observable, of } from 'rxjs';
import { ErrorContentManagerService } from 'src/app/error/ErrorContentManagerService';
import { NoHayResultadosError } from 'src/app/error/NoHayResultadosError';
import { ContentItem } from 'src/app/model/ContentItem';
import { ContentItemFilter } from 'src/app/model/ContentItemFilter';
import { Duration } from 'src/app/model/Duration';
import { IContentItemRating, IContentType } from 'src/app/model/Interfaces';
import { CustomLogger } from 'src/app/utils/CustomLogger';
import PagingUtils from 'src/app/utils/pagination/Pagination';
import { IContentManagerService } from '../interface/IContentManagerService';

export class ContentManagerServiceMock implements IContentManagerService {
  private _contentItems: ContentItem[];

  //1° Lista en objectos
  private _contentItemsListObjects: ContentItem[] = [
    new ContentItem(
      1,
      '¿Usaremos React en el futuro? OBJECT',
      'lo mejor de esto',
      IContentType.Video,
      ['Javascript', 'React'],
      new Duration(0, 5, 0),
      2,
      new Date('2020-03-25'),
      'https://www.youtube.com/watch?v=3ZwHGekEtAs'
    ),
    new ContentItem(
      2,
      'Mock JS Bis',
      'lo mejor de esto',
      IContentType.Article,
      ['Typescript', 'React'],
      new Duration(0, 10, 0),
      4,
      new Date('2022-03-25')
    ),
    new ContentItem(
      3,
      'Programacion OBJETOS',
      'lo mejor de esto',
      IContentType.Article,
      ['Programacion'],
      new Duration(0, 15),
      3,
      new Date('2005-03-25')
    ),
    new ContentItem(
      4,
      'Python Video',
      '¿Quieres aprender python en 15 minutos?',
      IContentType.Video,
      ['Programacion'],
      new Duration(0, 20),
      4,
      new Date('2010-03-25'),
      'https://www.youtube.com/watch?v=gOR9qZ3ZgwA'
    ),
    new ContentItem(
      5,
      'Angular',
      'lo mejor de esto',
      IContentType.Web,
      ['Data Science'],
      new Duration(0, 25),
      5,
      new Date('2009-03-25')
    ),
    new ContentItem(
      6,
      'Marketing',
      'lo mejor de esto',
      IContentType.Video,
      ['Marketing', 'React'],
      new Duration(0, 30),
      5,
      new Date('2001-03-25'),
      'https://www.youtube.com/watch?v=ImercojO_DI'
    ),
    new ContentItem(
      7,
      'Javascript',
      'lo mejor de esto',
      IContentType.Pdf,
      ['Marketing'],
      new Duration(0, 35),
      2,
      new Date('2005-03-25')
    ),
    new ContentItem(
      8,
      'Folder Structure Angular',
      'Folder Structure Angular',
      IContentType.Video,
      ['Typescript', 'Angular'],
      new Duration(0, 45),
      3,
      new Date('2020-03-25'),
      'https://www.youtube.com/watch?v=PPvprSz77jk'
    ),
    new ContentItem(
      9,
      'Javascript',
      'Aprende dedsde 0 lo mejor de javascript',
      IContentType.Video,
      ['Javascript'],
      new Duration(0, 62),
      4,
      new Date('2022-03-25'),
      'https://www.youtube.com/watch?v=Q9fwkpxr3Dw'
    ),
    new ContentItem(
      10,
      'Data Science',
      'lo mejor de esto',
      IContentType.Video,
      ['Data Science'],
      new Duration(0, 80),
      1,
      new Date('2021-03-25'),
      'https://www.youtube.com/watch?v=PPvprSz77jk'
    ),
  ];

  //2° Lista en JSON.
  private _contentItemsListJson = [
    {
      _id: 1,
      _title: '¿Usaremos React en el futuro? JSON',
      _description: 'lo mejor de esto',
      _contentType: 'video',
      _tags: ['Javascript', 'React'],
      _duration: { _hh: 0, _mm: 5, _ss: 0 },
      _rating: 2,
      _fechaCreacion: '2020-03-25T00:00:00.000Z',
      _videoUrl: 'https://www.youtube.com/watch?v=3ZwHGekEtAs',
    },
    {
      _id: 2,
      _title: 'Mock JS Bis',
      _description: 'lo mejor de esto',
      _contentType: 'article',
      _tags: ['Typescript', 'React'],
      _duration: { _hh: 0, _mm: 10, _ss: 0 },
      _rating: 4,
      _fechaCreacion: '2022-03-25T00:00:00.000Z',
    },
    {
      _id: 3,
      _title: 'Programacion JSON',
      _description: 'lo mejor de esto',
      _contentType: 'article',
      _tags: ['Programacion'],
      _duration: { _hh: 0, _mm: 15, _ss: 0 },
      _rating: 3,
      _fechaCreacion: '2005-03-25T00:00:00.000Z',
    },
    {
      _id: 4,
      _title: 'Python',
      _description: 'lo mejor de esto',
      _contentType: 'video',
      _tags: ['Programacion'],
      _duration: { _hh: 0, _mm: 20, _ss: 0 },
      _rating: 4,
      _fechaCreacion: '2010-03-25T00:00:00.000Z',
      _videoUrl: 'https://www.youtube.com/watch?v=dAAPKZGjOKc',
    },
    {
      _id: 5,
      _title: 'Angular',
      _description: 'lo mejor de esto',
      _contentType: 'web',
      _tags: ['Data Science'],
      _duration: { _hh: 0, _mm: 25, _ss: 0 },
      _rating: 5,
      _fechaCreacion: '2009-03-25T00:00:00.000Z',
    },
    {
      _id: 6,
      _title: 'Marketing',
      _description: 'lo mejor de esto',
      _contentType: 'video',
      _tags: ['Marketing', 'React'],
      _duration: { _hh: 0, _mm: 30, _ss: 0 },
      _rating: 5,
      _fechaCreacion: '2001-03-25T00:00:00.000Z',
      _videoUrl: 'https://www.youtube.com/watch?v=dAAPKZGjOKc',
    },
    {
      _id: 7,
      _title: 'Javascript',
      _description: 'lo mejor de esto',
      _contentType: 'pdf',
      _tags: ['Marketing'],
      _duration: { _hh: 0, _mm: 35, _ss: 0 },
      _rating: 2,
      _fechaCreacion: '2005-03-25T00:00:00.000Z',
    },
    {
      _id: 8,
      _title: 'React',
      _description: 'lo mejor de esto',
      _contentType: 'video',
      _tags: ['Typescript', 'React'],
      _duration: { _hh: 0, _mm: 45, _ss: 0 },
      _rating: 3,
      _fechaCreacion: '2020-03-25T00:00:00.000Z',
      _videoUrl: 'https://www.youtube.com/watch?v=dAAPKZGjOKc',
    },
    {
      _id: 9,
      _title: 'Javascript',
      _description: 'Aprende dedsde 0 lo mejor de javascript',
      _contentType: 'video',
      _tags: ['Javascript'],
      _duration: { _hh: 0, _mm: 62, _ss: 0 },
      _rating: 4,
      _fechaCreacion: '2022-03-25T00:00:00.000Z',
      _videoUrl: 'https://www.youtube.com/watch?v=Q9fwkpxr3Dw',
    },
    {
      _id: 10,
      _title: 'Data Science',
      _description: 'lo mejor de esto',
      _contentType: 'video',
      _tags: ['Data Science'],
      _duration: { _hh: 0, _mm: 80, _ss: 0 },
      _rating: 1,
      _fechaCreacion: '2021-03-25T00:00:00.000Z',
      _videoUrl: 'https://www.youtube.com/watch?v=dAAPKZGjOKc',
    },
  ];

  /**
   * @param _customLogger CustomLogger
   */
  constructor(private _customLogger: CustomLogger = new CustomLogger()) {
    // this._contentItems = this.getJsonList(this._contentItemsListJson); //1°  Lista Json
    this._contentItems = this._contentItemsListObjects; //2°  Lista Objetos
    this._customLogger.logInfo('ContentManagerMock Instanciando Servicio');
  }

  //? - - - - - - - - - - - - - -  Unique Options to Filter - - - - - - - - - - - - - -

  /**
   *  Retorna los tags únicos de toda la lista posible de contentItems sin filtrar y sin pageIterator. Utilizar para filtros, seleccion de tags posibles
   * @return :string[]
   */
  public getUniqueTags(): string[] {
    const tags = this._contentItems.reduce(
      (acc: any, obj: any) => [...acc, ...obj._tags],
      []
    );

    const uniqueTags = Array.from(new Set(tags));

    if (
      !Array.isArray(uniqueTags) ||
      !uniqueTags.every((tag: any) => typeof tag === 'string')
    ) {
      throw new Error('La función no devolvió un array de strings');
    }

    return uniqueTags;
  }

  /**
   * Retorna los contetTypes unicos de la lista. Verifica que coincida con los IContentType validos, si no lo hace lanza un error.
   * @returns IContentType[]
   */
  getUniqueContentTypes(): IContentType[] {
    const contentTypesSet = new Set<IContentType>();

    // Iterate the array and add to contentTypesSet.
    this._contentItems.forEach((contentItem) => {
      verifyContentTypes(this._contentItems);
      contentTypesSet.add(contentItem.contentType);
    });

    // Verifica si contiene un contentTypeErroneo.
    function verifyContentTypes(contentItemsList: ContentItem[]): boolean {
      for (const item of contentItemsList) {
        if (!Object.values(IContentType).includes(item.contentType)) {
          throw new Error(
            `ContentItem:  ${item.id} tiene un invalido content type: ${item.contentType}`
          );
        }
      }
      return true;
    }

    // if (this._contentItemsList.some((item) => !(item.contentType in IContentType))) {
    //     throw new Error(`Al menos un elemento de la lista tiene un tipo de contenido no válido.`);
    // }

    return Array.from(contentTypesSet);
  }

  //? - - - - - - - - - - - - - - Filter Functions - - - - - - - - - - - - - -
  /**
   * @returns Cantidad total de items coincidentes con este filtro.
   */
  getTotalCuantityContentItems(filter: ContentItemFilter): number {
    let result = this.getContentsItemsByFilter(filter).length;
    return result;
  }

  // Todo Pagin Utils
  /**
   *
   * @param filter: busqueda por un filtro especifico.
   * @param page: pagina solicidata
   * @param limit: cantidad de items por pagina
   * @param order: any
   * @return lista de ContentItem primero filtrados y luego paginados.
   */
  getContentItemsByFilterPaged(
    filter: ContentItemFilter,
    page: number = 1,
    limit: number = 2,
    order: any = 'desc'
  ): ContentItem[] {
    try {
      let result = this.getContentsItemsByFilter(filter);
      return PagingUtils.getContentsItemsByFilterByPagination(
        page,
        limit,
        order,
        result
      );
    } catch (error) {
      throw new ErrorContentManagerService(
        `Error en getContentItemByFilterPaged ${error}`
      );
    }
  }

  /**
   *
   * @param filter ContentItemFilter
   * @returns Lista de contentItem filtrados
   */
  getContentsItemsByFilter(filter: ContentItemFilter): Array<ContentItem> {
    const contentItemList = this._contentItems;

    // Crear variable inicialziada en null.
    let voidFilter = new ContentItemFilter();

    let _filterContentList: Array<ContentItem> = [];

    for (let i = 0; i < contentItemList.length; i++) {
      let passedFilter = true;

      if (filter.titleOrDescription !== '') {
        if (
          !contentItemList[i].containDescriptionOrTitle(
            filter.titleOrDescription.toLowerCase()
          )
        ) {
          passedFilter = false;
        }
      }

      // Tags
      if (filter.tags.length !== 0) {
        if (!contentItemList[i].containTags(filter.tags)) {
          passedFilter = false;
        }
      }

      // RATING
      if (
        filter.ratingSince !== IContentItemRating.Void ||
        filter.ratingUntil !== IContentItemRating.Void
      ) {
        if (
          !contentItemList[i].containsRating(
            filter.ratingSince,
            filter.ratingUntil
          )
        ) {
          passedFilter = false;
        }
      }

      // ContentType
      if (filter.contentType !== '') {
        if (contentItemList[i].contentType !== filter.contentType) {
          passedFilter = false;
        }
      }

      // Fecha
      if (
        filter.fechaCreacionSince !== voidFilter.fechaCreacionUntil ||
        filter.fechaCreacionUntil !== voidFilter.fechaCreacionSince
      ) {
        if (
          !contentItemList[i].containsFechaCreacion(
            filter.fechaCreacionSince,
            filter.fechaCreacionUntil
          )
        ) {
          passedFilter = false;
        }
      }

      // Duration
      if (
        filter.durationSince !== voidFilter.durationSince ||
        filter.durationUntil !== voidFilter.durationUntil
      ) {
        if (
          !contentItemList[i].containsItemsBetweenTwoDurations(
            filter.durationSince,
            filter.durationUntil
          )
        ) {
          passedFilter = false;
        }
      }

      if (passedFilter) {
        _filterContentList.push(contentItemList[i]);
      }
    }

    if (_filterContentList.length <= 0) {
      throw new NoHayResultadosError(
        `No hay ningun resultado para esta busqueda con estos filtros ${filter.toString()} .`
      );
    } else {
      return _filterContentList;
    }
  }

  //? - - - - - - - - - - - - -   Main Functions - - - - - - - - - - - - -

  createContentItem(contentItem: ContentItem): Observable<ContentItem> {
    try {
      this._customLogger.logDebug(
        '[ContentManagerServiceMock] CreateContentItem()',
        `Form ContentItem prueba fecha: ${new Date('2020-03-25')}`,
        JSON.stringify(contentItem, null, 2)
      );

      const newContentItem = new ContentItem(
        Math.floor(Math.random() * (100 - 50 + 1) + 50),
        contentItem.title,
        contentItem.description,
        contentItem.contentType,
        contentItem.tags,
        contentItem.duration,
        contentItem.rating,
        contentItem.fechaCreacion,
        contentItem.videoUrl
      );
      this._customLogger.logDebug(
        '[ContentManagerServiceMock] CreateContentItem()',
        'ContentItem Creado',
        newContentItem
      );

      //? Lista Objetos
      this._contentItems.push(newContentItem);
      this._customLogger.logDebug(
        '[ContentManagerServiceMock], CreateContentItem()',
        'Lista Objetos:',
        this._contentItems
      );

      //? Lista Json
      // this._jsonContentItems.push(newContentItem);
      // this._customLogger.logDebug("CreateContentItem()", "Lista Json:", this._jsonContentItems)

      return of(newContentItem);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  editContentItem(contentItem: ContentItem): Observable<ContentItem> {
    // Id a buscar.
    const id = contentItem.id;

    try {
      for (let i = 0; i < this._contentItems.length; i++) {
        if (this._contentItems[i].id === id) {
          // Actualizo el objeto encontrado con la información actualizada
          this._contentItems[i].title = contentItem.title;
          this._contentItems[i].description = contentItem.description;
          this._contentItems[i].contentType = contentItem.contentType;
          this._contentItems[i].tags = contentItem.tags;
          this._contentItems[i].duration = contentItem.duration;
          this._contentItems[i].rating = contentItem.rating;
          this._contentItems[i].fechaCreacion = contentItem.fechaCreacion;

          // this._customLogger.logDebug("[ContentManagerServiceMock] EditContentItem", "Lista JSON  actualizada", this._jsonContentItems)
          this._customLogger.logDebug(
            '[ContentManagerServiceMock] EditContentItem',
            'Lista OBJETOS  actualizada',
            this._contentItems
          );

          // Retorno el objeto actualizado
          return of(this._contentItems[i]);
        }
      }
      // Si no se encuentra ningún objeto con el id especificado, retornamos un error
      throw new Error(`No se encontró ningún objeto con id ${id}`);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * @returns todos los contentItems desde la apiUrl.
   */
  getAllContentItems(): Observable<ContentItem[]> {
    try {
      let response: ContentItem[] = this._contentItems.slice();

      this._customLogger.logDebug(
        `[ContentManagerServiceMock] => getContentItemById => contentItem=${JSON.stringify(
          response,
          null,
          4
        )}`
      );

      return of(response);
    } catch (error) {
      this._customLogger.logError(
        '[ContentManagerServiceMock], getContentItemById',
        error
      );
      throw new ErrorContentManagerService(
        `[ContentManagerServiceMock], getContentItemById => ${error} `
      );
    }
  }

  getContentItemById(id: number): Observable<ContentItem> {
    throw new Error('Method not implemented.');
  }

  /**
   * Retorna el metodo getContentItemByID para este sprint.
   * @param id
   * @returns contentItem
   */
  deleteContentItem(id: number): Observable<ContentItem> {
    this._customLogger.logDebug('ManagerMock, onDelete', 'Id Recibido: ', id);
    try {
      const index = this._contentItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        const deletedItem = this._contentItems.splice(index, 1)[0];
        this._customLogger.logDebug(
          `ContentManager , deleteContentItem => Borrando el contentItem=${JSON.stringify(
            deletedItem,
            null,
            2
          )}`
        );
        return of(deletedItem);
      } else {
        throw new Error(
          `ContentManager , deleteContentItem => No se encontro ningun contentItem con este id=${id}`
        );
      }
    } catch (error) {
      this._customLogger.logError('[deleteContentItem]', error);
      throw new ErrorContentManagerService(
        `ContentManager , deleteContentItem Error=> ${error} `
      );
    }
  }

  //? - - - - - - - - - - - - -   Helpers  - - - - - - - - - - - - -

  /**
   * Transforma una lista Json en objetos ContentItem.
   * @returns ContentItem[]
   */
  private transformJsonToObject(jsonListContentItem: any[]): ContentItem[] {
    function parseContentType(contentType: string): IContentType {
      switch (contentType.toLowerCase()) {
        case 'video':
          return IContentType.Video;
        case 'article':
          return IContentType.Article;
        case 'web':
          return IContentType.Web;
        case 'pdf':
          return IContentType.Pdf;
        default:
          throw new Error(`Tipo de contenido no válido: ${contentType}`);
      }
    }

    // const jsonListTransformed: ContentItem[] = this._jsonContentItems.map(item => new ContentItem(
    const jsonListTransformed: ContentItem[] = jsonListContentItem.map(
      (item) =>
        new ContentItem(
          item._id,
          item._title,
          item._description,
          parseContentType(item._contentType),
          item._tags,
          new Duration(
            item._duration._hh,
            item._duration._mm,
            item._duration._ss
          ),
          item._rating,
          new Date(item._fechaCreacion)
        )
    );

    return jsonListTransformed;
  }

  /**
   * Retorna la lista JSON en un objeto. Invocar esta función donde se inicialice el array de contentItems.
   * @returns
   */
  private getJsonList(jsonListContentItem: any[]): ContentItem[] {
    const jsonListTransformed = this.transformJsonToObject(jsonListContentItem);
    return jsonListTransformed;
  }
}

// @Injectable({
//   providedIn: 'root'
// })

// export class ContentManagerServiceMock implements IContentManagerService{

//     private _contentItems: ContentItem[];
//     private _jsonContentItems: any[] = [];

//     //1° Lista en objectos
//     private _contentItemsList: ContentItem[] = [
//     new ContentItem(1, "Mock JS", "lo mejor de esto", IContentType.Video, ["Javascript", "React"], new Duration(0,5,0), 2, new Date("2020-03-25"), "https://www.youtube.com/embed/qz0WjbGlmv0" ),
//     new ContentItem(2, "Mock JS Bis", "lo mejor de esto", IContentType.Article, ["Typescript", "React"], new Duration(0,10,0), 4, new Date("2022-03-25")),
//     new ContentItem(3, "Programacion OBJETOS", "lo mejor de esto", IContentType.Article, ["Programacion"], new Duration(0,15), 3, new Date("2005-03-25")),
//     new ContentItem(4, "Python Video", "lo mejor de esto", IContentType.Video, ["Programacion"], new Duration(0,20), 4, new Date("2010-03-25"), "https://www.youtube.com/embed/qz0WjbGlmv0"),
//     new ContentItem(5, "Angular", "lo mejor de esto", IContentType.Web, ["Data Science"], new Duration(0,25), 5, new Date("2009-03-25")),
//     new ContentItem(6, "Marketing", "lo mejor de esto", IContentType.Video, ["Marketing", "React"], new Duration(0,30), 5, new Date("2001-03-25"), "https://www.youtube.com/watch?v=ImercojO_DI"),
//     new ContentItem(7, "Javascript", "lo mejor de esto", IContentType.Pdf, ["Marketing"], new Duration(0,35), 2, new Date("2005-03-25")),
//     new ContentItem(8, "Folder Structure Angular", "Folder Structure Angular", IContentType.Video, ["Typescript", "Angular"], new Duration(0,45), 3, new Date("2020-03-25"),"https://www.youtube.com/watch?v=WA95EJGhbLc&t=1097s"),
//     new ContentItem(9, "Javascript", "lo mejor de esto", IContentType.Video, ["Javascript"], new Duration(0,62), 4, new Date("2022-03-25")),
//     new ContentItem(10, "Data Science", "lo mejor de esto", IContentType.Video, ["Data Science"], new Duration(0,80), 1, new Date("2021-03-25")),
//     ];

//     //2° Lista en JSON.
//     private jsonList = [{ "_id": 1, "_title": "Mock JS", "_description": "lo mejor de esto", "_contentType": "video", "_tags": ["Javascript", "React"], "_duration": { "_hh": 0, "_mm": 5, "_ss": 0 }, "_rating": 2, "_fechaCreacion": "2020-03-25T00:00:00.000Z", "_videoUrl":  "https://www.youtube.com/watch?v=WA95EJGhbLc&t=1096s" },
//         { "_id": 2, "_title": "Mock JS Bis", "_description": "lo mejor de esto", "_contentType": "article", "_tags": ["Typescript", "React"], "_duration": { "_hh": 0, "_mm": 10, "_ss": 0 }, "_rating": 4, "_fechaCreacion": "2022-03-25T00:00:00.000Z" },
//         { "_id": 3, "_title": "Programacion JSON", "_description": "lo mejor de esto", "_contentType": "article", "_tags": ["Programacion"], "_duration": { "_hh": 0, "_mm": 15, "_ss": 0 }, "_rating": 3, "_fechaCreacion": "2005-03-25T00:00:00.000Z" },
//         { "_id": 4, "_title": "Python", "_description": "lo mejor de esto", "_contentType": "video", "_tags": ["Programacion"], "_duration": { "_hh": 0, "_mm": 20, "_ss": 0 }, "_rating": 4, "_fechaCreacion": "2010-03-25T00:00:00.000Z", "_videoUrl": "https://www.youtube.com/watch?v=dAAPKZGjOKc"  },
//         { "_id": 5, "_title": "Angular", "_description": "lo mejor de esto", "_contentType": "web", "_tags": ["Data Science"], "_duration": { "_hh": 0, "_mm": 25, "_ss": 0 }, "_rating": 5, "_fechaCreacion": "2009-03-25T00:00:00.000Z" },
//         { "_id": 6, "_title": "Marketing", "_description": "lo mejor de esto", "_contentType": "video", "_tags": ["Marketing", "React"], "_duration": { "_hh": 0, "_mm": 30, "_ss": 0 }, "_rating": 5, "_fechaCreacion": "2001-03-25T00:00:00.000Z" , "_videoUrl": "https://www.youtube.com/watch?v=dAAPKZGjOKc"},
//         { "_id": 7, "_title": "Javascript", "_description": "lo mejor de esto", "_contentType": "pdf", "_tags": ["Marketing"], "_duration": { "_hh": 0, "_mm": 35, "_ss": 0 }, "_rating": 2, "_fechaCreacion": "2005-03-25T00:00:00.000Z" },
//         { "_id": 8, "_title": "React", "_description": "lo mejor de esto", "_contentType": "video", "_tags": ["Typescript", "React"], "_duration": { "_hh": 0, "_mm": 45, "_ss": 0 }, "_rating": 3, "_fechaCreacion": "2020-03-25T00:00:00.000Z", "_videoUrl": "https://www.youtube.com/watch?v=dAAPKZGjOKc" },
//         { "_id": 9, "_title": "Javascript", "_description": "lo mejor de esto", "_contentType": "video", "_tags": ["Javascript"], "_duration": { "_hh": 0, "_mm": 62, "_ss": 0 }, "_rating": 4, "_fechaCreacion": "2022-03-25T00:00:00.000Z", "_videoUrl": "https://www.youtube.com/watch?v=dAAPKZGjOKc" },
//         { "_id": 10, "_title": "Data Science", "_description": "lo mejor de esto", "_contentType": "video", "_tags": ["Data Science"], "_duration": { "_hh": 0, "_mm": 80, "_ss": 0 }, "_rating": 1, "_fechaCreacion": "2021-03-25T00:00:00.000Z", "_videoUrl": "https://www.youtube.com/watch?v=dAAPKZGjOKc" }]

//     /**
//      * @param _customLogger CustomLogger
//      */
//     constructor(
//         private _customLogger: CustomLogger = new CustomLogger(),
//     ) {
//         // Todo hacer uno solo. Pasar por param en el metodo getJsonList.
//         this._jsonContentItems = this.jsonList; //1°  Lista Json
//         // this._contentItems = this._contentItemsList  //2°  Lista Objetos
//         this._contentItems = this.getJsonList();

//     }

// //? - - - - - - - - - - - - - -  Unique Options to Filter - - - - - - - - - - - - - -

//     /**
//      *  Retorna los tags únicos de toda la lista posible de contentItems sin filtrar y sin pageIterator. Utilizar para filtros, seleccion de tags posibles
//      * @return :string[]
//      */
//     public getUniqueTags(): string[] {
//         const tags = this._jsonContentItems.reduce((acc: any, obj: any) => [...acc, ...obj._tags], []);
//         const uniqueTags = Array.from(new Set(tags));

//         if (!Array.isArray(uniqueTags) || !uniqueTags.every((tag: any) => typeof tag === 'string')) {
//             throw new Error('La función no devolvió un array de strings');
//         }

//         return uniqueTags;
//     }

//     /**
//      * Retorna los contetTypes unicos de la lista. Verifica que coincida con los IContentType validos, si no lo hace lanza un error.
//      * @returns IContentType[]
//      */
//     getUniqueContentTypes(): IContentType[] {
//         const contentTypesSet = new Set<IContentType>()

//         // Iterate the array and add to contentTypesSet.
//         this._contentItemsList.forEach(contentItem => {
//             verifyContentTypes(this._contentItemsList);
//             contentTypesSet.add(contentItem.contentType);
//         });

//         // Verifica si contiene un contentTypeErroneo.
//         function verifyContentTypes(contentItemsList: ContentItem[]): boolean {
//         for (const item of contentItemsList) {
//             if (!Object.values(IContentType).includes(item.contentType)) {
//             throw new Error(`ContentItem:  ${item.id} tiene un invalido content type: ${item.contentType}`);
//             }
//         }
//             return true;
//         }

//         // if (this._contentItemsList.some((item) => !(item.contentType in IContentType))) {
//         //     throw new Error(`Al menos un elemento de la lista tiene un tipo de contenido no válido.`);
//         // }

//         return Array.from(contentTypesSet);
//     }

// //? - - - - - - - - - - - - - - Filter Functions - - - - - - - - - - - - - -
//    /**
//      * @returns Cantidad total de items coincidentes con este filtro.
//      */
//     getTotalCuantityContentItems(filter: ContentItemFilter): number {
//         let result = this.getContentsItemsByFilter(filter).length
//         return result;
//      };

//     // Todo Pagin Utils
//     /**
//      *
//      * @param filter: busqueda por un filtro especifico.
//      * @param page: pagina solicidata
//      * @param limit: cantidad de items por pagina
//      * @param order: any
//      * @return lista de ContentItem primero filtrados y luego paginados.
//      */
//     getContentItemsByFilterPaged(filter: ContentItemFilter, page: number = 1, limit: number = 2, order: any = "desc"): ContentItem[] {

//         try {
//             let result = this.getContentsItemsByFilter(filter);
//             return PagingUtils.getContentsItemsByFilterByPagination(page,limit,order, result)
//         } catch (error) {
//             throw new ErrorContentManagerService(`Error en getContentItemByFilterPaged ${error}`)
//         }

//     }

//      /**
//      *
//      * @param filter ContentItemFilter
//      * @returns Lista de contentItem filtrados
//      */
//     getContentsItemsByFilter(filter: ContentItemFilter): Array<ContentItem>  {

//         const contentItemList = this._contentItems;

//         // Crear variable inicialziada en null.
//         let voidFilter = new ContentItemFilter();

//         let _filterContentList: Array<ContentItem> = [];

//         for (let i = 0; i < contentItemList.length; i++) {
//             let passedFilter = true;

//             if (filter.titleOrDescription !== "") {

//                 if (!contentItemList[i].containDescriptionOrTitle(filter.titleOrDescription.toLowerCase())) {
//                     passedFilter = false;
//                 }
//             }

//             // Tags
//             if (filter.tags.length !== 0) {

//                 if (!contentItemList[i].containTags(filter.tags)) {
//                     passedFilter = false;
//                 }
//             }

//             // RATING
//             if (filter.ratingSince !== IContentItemRating.Void || filter.ratingUntil !== IContentItemRating.Void) {

//                 if (!contentItemList[i].containsRating(filter.ratingSince, filter.ratingUntil)) {
//                     passedFilter = false;
//                 }
//             }

//             // ContentType
//             if (filter.contentType !== "") {

//                 if (contentItemList[i].contentType !== filter.contentType) {
//                     passedFilter = false;
//                 }
//             }

//             // Fecha
//             if (filter.fechaCreacionSince !== voidFilter.fechaCreacionUntil || filter.fechaCreacionUntil !== voidFilter.fechaCreacionSince) {

//                 if (!contentItemList[i].containsFechaCreacion(filter.fechaCreacionSince, filter.fechaCreacionUntil)) {
//                     passedFilter = false;
//                 }
//             }

//             // Duration
//             if (filter.durationSince !== voidFilter.durationSince || filter.durationUntil !== voidFilter.durationUntil) {

//                 if (!contentItemList[i].containsItemsBetweenTwoDurations(filter.durationSince, filter.durationUntil)) {
//                     passedFilter = false;
//                 }
//             }

//             if (passedFilter) {
//                 _filterContentList.push(contentItemList[i])
//             }

//         }

//         if (_filterContentList.length <= 0) {
//             throw new NoHayResultadosError(`No hay ningun resultado para esta busqueda con estos filtros ${filter.toString()} .`)
//         } else {
//             return _filterContentList;
//         }
//     }

//     //? - - - - - - - - - - - - -   Main Functions - - - - - - - - - - - - -

//     createContentItem(contentItem: ContentItem): Observable<ContentItem> {
//         try {
//             this._customLogger.logDebug("[ContentManagerServiceMock] CreateContentItem()", "Form ContentItem", contentItem)

//             const newContentItem = new ContentItem(
//                 Math.floor(Math.random() * (100 -50 + 1) + 50),
//                 contentItem.title,
//                 contentItem.description,
//                 contentItem.contentType,
//                 contentItem.tags,
//                 contentItem.duration,
//                 contentItem.rating,
//                 contentItem.fechaCreacion,
//             )
//             this._customLogger.logDebug("[ContentManagerServiceMock] CreateContentItem()", "ContentItem Creado", newContentItem)

//             //? Lista Objetos
//             this._contentItemsList.push(newContentItem);
//             this._customLogger.logDebug("[ContentManagerServiceMock], CreateContentItem()", "Lista Objetos:", this._contentItemsList)

//             //? Lista Json
//             this._jsonContentItems.push(newContentItem);
//             this._customLogger.logDebug("CreateContentItem()", "Lista Json:", this._jsonContentItems)

//             return of(newContentItem);

//         } catch (error) {
//             throw new Error(`${error}`);
//         }
//     }

//     editContentItem(contentItem: ContentItem): Observable<ContentItem> {
//         // Id a buscar.
//         const id = contentItem.id

//         try {
//             for (let i = 0; i < this._contentItemsList.length; i++) {
//                 if (this._contentItemsList[i].id === id) {

//                     // Actualizo el objeto encontrado con la información actualizada
//                     this._contentItemsList[i].title = contentItem.title;
//                     this._contentItemsList[i].description = contentItem.description;
//                     this._contentItemsList[i].contentType = contentItem.contentType;
//                     this._contentItemsList[i].tags = contentItem.tags;
//                     this._contentItemsList[i].duration = contentItem.duration;
//                     this._contentItemsList[i].rating = contentItem.rating;
//                     this._contentItemsList[i].fechaCreacion = contentItem.fechaCreacion;

//                     this._customLogger.logDebug("[ContentManagerServiceMock] EditContentItem", "Lista JSON  actualizada", this._jsonContentItems)
//                     this._customLogger.logDebug("[ContentManagerServiceMock] EditContentItem", "Lista OBJETOS  actualizada", this._contentItemsList)

//                     // Retorno el objeto actualizado
//                     return of(this._contentItemsList[i]);
//                 }

//             }
//         // Si no se encuentra ningún objeto con el id especificado, retornamos un error
//         throw new Error(`No se encontró ningún objeto con id ${id}`);

//         } catch (error) {
//             throw new Error(`${error}`);
//         }
//     }

//       /**
//   * @returns todos los contentItems desde la apiUrl.
//   */
//   getAllContentItems(): Observable<ContentItem[]> {
//     try {
//         let response: ContentItem[] = this._contentItems.slice();

//         this._customLogger.logDebug(`[ContentManagerServiceMock] => getContentItemById => contentItem=${(JSON.stringify(response, null, 4))}`);

//         return of(response);
//     } catch (error) {
//         this._customLogger.logError("[ContentManagerServiceMock], getContentItemById", error)
//         throw new ErrorContentManagerService(`[ContentManagerServiceMock], getContentItemById => ${error} `)
//     }
//   }

//   getContentItemById(id: number): Observable<ContentItem> {
//     throw new Error('Method not implemented.');
//   }

//   deleteContentItem(id: number): Observable<ContentItem> {
//     try {
//         const index = this._contentItemsList.findIndex(item => item.id === id);

//         if (index !== -1) {
//             const deletedContentItem = this._contentItemsList.splice(index, 1)[0];

//             this._customLogger.logDebug("[ContentManagerServiceMock] deleteContentItem", "Lista JSON actualizada", this._jsonContentItems)
//             this._customLogger.logDebug("[ContentManagerServiceMock] deleteContentItem", "Lista OBJETOS actualizada", this._contentItemsList)

//             return of(deletedContentItem);
//         }

//         throw new Error(`Ningun contenido con id:${id} fue encontrado.`);

//     } catch (error) {
//         throw new Error(`${error}`)
//     }
//   }

//     //? - - - - - - - - - - - - -   Helpers  - - - - - - - - - - - - -

//     /**
//      * Transforma una lista Json en objetos ContentItem.
//      * @returns
//      */
//     private transformJsonToObject() {

//         function parseContentType(contentType: string): IContentType {
//             switch (contentType.toLowerCase()) {
//                 case 'video':
//                 return IContentType.Video;
//                 case 'article':
//                 return IContentType.Article;
//                 case 'web':
//                 return IContentType.Web;
//                 case 'pdf':
//                 return IContentType.Pdf;
//                 default:
//                 throw new Error(`Tipo de contenido no válido: ${contentType}`);
//             }
//         }

//         const jsonListTransformed: ContentItem[] = this._jsonContentItems.map(item => new ContentItem(
//             item._id,
//             item._title,
//             item._description,
//             parseContentType(item._contentType),
//             item._tags,
//             new Duration(item._duration._hh, item._duration._mm, item._duration._ss),
//             item._rating,
//             new Date(item._fechaCreacion)
//         ));

//         return jsonListTransformed
//     }

//     /**
//      * Retorna la lista JSON en un objeto. Invocar esta función donde se inicialice el array de contentItems.
//      * @returns
//      */
//     private getJsonList() {
//         // let contentItemJson = JSON.stringify(this._contentItems)
//         // return contentItemJson;

//         const jsonListTransformed = this.transformJsonToObject()
//         return jsonListTransformed;
//     }

// }
// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { ErrorContentManagerService } from 'src/app/error/ErrorContentManagerService';
// import { NoHayResultadosError } from 'src/app/error/NoHayResultadosError';
// import { ContentItem } from 'src/app/model/ContentItem';
// import { ContentItemFilter } from 'src/app/model/ContentItemFilter';
// import { Duration } from 'src/app/model/Duration';
// import { IContentItemRating, IContentType } from 'src/app/model/Interfaces';
// import { CustomLogger } from 'src/app/utils/CustomLogger';
// import PagingUtils from 'src/app/utils/pagination/Pagination';
// import { IContentManagerService } from '../interface/IContentManagerService';

// @Injectable({
//   providedIn: 'root'
// })
