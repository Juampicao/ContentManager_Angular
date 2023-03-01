import { ErrorExternoAlPasarParams } from "src/app/error/ErrorExternoAlPasarParams";
import { NoHayResultadosError } from "src/app/error/NoHayResultadosError";
import { ContentItem } from "src/app/model/ContentItem";
import { IOrderArray } from "src/app/model/Interfaces";
import { CustomLogger } from "../CustomLogger";


let _customLogger = new CustomLogger();

export default class PagingUtils{

  /**
   * 
   * @param page:number = 1
   * @param limit:number = 2
   * @param order= asc o desc
   * @param array:ContentItem 
   * @returns lista de contentItem paginados.
   */
  static getContentsItemsByFilterByPagination(page: number = 1, limit: number = 2, order: IOrderArray = IOrderArray.ASC, array : Array<ContentItem> ) : Array<ContentItem> {
                  
    if (page <= 0 || limit <= 0) {
      throw new ErrorExternoAlPasarParams(`La pagina y el limit deben ser mayores a 0. Page=${page}, Limit=${limit}`)
    }
        
    //Todo No funciona // Filter Field. Paginar desde esta lista ordenada. 
    // let arrayOrdenado =  orderArray(array, "_contentType",IOrderArray.ASC)
    
    let skip: number = (page - 1) * limit; 
    let listContentItemFilterByPagination: Array<ContentItem> = array.slice(skip, limit * page)
    let totalPages: number = Math.ceil(array.length / limit)
    let lastPage: number = totalPages; 
    
    let nextPage: number = page + 1;
    let prevPage: number = page - 1; 
    
    if (prevPage <= 0 || nextPage >= totalPages) { 
      prevPage = 1;     
      nextPage = totalPages; 
    }
    
    if ( page > totalPages) {
      throw new NoHayResultadosError(`La pagina=${page} no existe.`)
    }

    if (listContentItemFilterByPagination.length <= 0) {
      throw new NoHayResultadosError(`No hay ningun resultado para esta busqueda: page=${page}, limit=${limit}`)
    } 
      
    let response = { "page": page, "limit": limit, "order": order, "totalPages": totalPages, "lastPage":lastPage, "totalItems": array.length, "ListontentItemFilterByPagination": listContentItemFilterByPagination, "nextPage": nextPage , "prevPage": prevPage }
    
    _customLogger.logDebug(`${response}`)
    _customLogger.logDebug(`Pagination, getContentsItemsByFilterByPaginationFN`,`la lista filtrada es: ${(JSON.stringify(listContentItemFilterByPagination, null, 2))}`)
    
    return listContentItemFilterByPagination; 
    
  }

}











// No se puede creear instancias de la clase. Solo poniendo el nombre
// Opcion a) nombreDeLaClase.metodo = metodoDeClase => Ejemplo => PagingUtils.filterByPage(params) . // No instancio nada, solo lo llamo. // El filterByPage, debe ser static. static=clase, sino es de instancia.
// Opcion b) generar un metodo de instancia. Con constructor. Ejemplo => (new PagingUtils()).filterByPage(params). Necesito una instancia (un new). No lleva static.
// ¿Donde usarias metodos statics? en utils.  Date utils. Resuelven algo y lo devuelven. Parecido a una funcion.
// Si tengo un atributo
// Metodo de classe ejemplo Array.apply(), estoy invocando sin instanciar.

// Singleton => Aseguro que solo hay una instancia en toda la app. No existe el new. contentManager.getInstance().

// Opcion B ejemp
















