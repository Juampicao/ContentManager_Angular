import { Observable } from "rxjs";
import { ContentItem } from "src/app/model/ContentItem";
import { ContentItemFilter } from "src/app/model/ContentItemFilter";
import { IContentType } from "src/app/model/Interfaces";

export interface IContentManagerService{
    /**
     *  Retorna los tags únicos de toda la lista posible de contentItems sin filtrar y sin pageIterator. Utilizar para filtros, seleccion de tags posibles
     * @return :string[]
     */
    getUniqueTags(): string[];

     /**
     * Retorna los contetTypes unicos de la lista. Verifica que coincida con los IContentType validos, si no lo hace lanza un error.
     * @returns IContentType[]
     */
    getUniqueContentTypes(): IContentType[];
    
    /** 
     * Crear un contentItem nuevo
     * @param contentItem ContentItem
     */
    createContentItem(contentItem: ContentItem | string): Observable<ContentItem>; 
    
    /**
     * Edita un contentItem viejo.
     * @param contentItem ContentItem
     */
    editContentItem(contentItem:  ContentItem | string ) : Observable<ContentItem>; 
    
    getAllContentItems(): Observable<ContentItem[]>; 

    getContentItemById(id: number): Observable<ContentItem>

    deleteContentItem(id: number): Observable<ContentItem>;

    
    /**
     * 
     * @param filter: ContentItemFilter. Busqueda especifica segun filtros
    */
    getContentsItemsByFilter(filter : ContentItemFilter): ContentItem[];

    /**
     * 
     * @param filter: busqueda por un filtro especifico.
     * @param page: pagina solicidata
     * @param limit: cantidad de items por pagina 
     * @param order?: any
     * @return lista de ContentItem primero filtrados y luego paginados.
     */
    getContentItemsByFilterPaged(filter: ContentItemFilter, page: number, limit: number, order?: any): ContentItem[] 

    /**
    * @param filter: busqueda por un filtro especifico.
    * @returns Cantidad total de items coincidentes con este filtro.
    */
    getTotalCuantityContentItems(filter:ContentItemFilter): number;

}