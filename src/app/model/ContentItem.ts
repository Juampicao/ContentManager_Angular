// export interface IContentItem {
//   title: string;
//   duration: number;
//   contentType: string;
//   description: string;
//   tags: string[];
//   fechaCreacion: Date;
//   rating: number;
// }

// export class ContentItem {
  //   id!: number; 
  //   title: string;
  //   duration: number;
  //   contentType: string;
//   description: string;
//   tags: string[];
//   fechaCreacion: Date
//   rating: number;


//   constructor(title: string = "", duration : number = 0, contentType : string = "", description: string = "", tags: string[] = [], fechaCreacion: Date = new Date(), rating: number = 5) {
  //     this.title = title,
  //     this.duration = duration,
  //     this.contentType = contentType
  //     this.description = description
  //     this.tags = tags
  //     this.fechaCreacion = fechaCreacion
  //     this.rating = rating
  //     this.id = 0; 
  
  //     // this.id = this.getRandomInt(1000)
  //   }
  
  //   // private getRandomInt(max: number) {
    //   //   return Math.floor(Math.random() * max);
    //   // }

//   toString(): string {
//     return `ContentItem = title=${this.title}, id=${this.id}, duration=${this.duration}, contentyType=${this.contentType}, tags=${this.tags}, fechaCracion=${this.fechaCreacion}, rating=${this.rating} `
//   }
// }


import { ErrorExternoAlPasarParams } from "../error/ErrorExternoAlPasarParams";
import { CustomLogger } from "../utils/CustomLogger";
import { Duration } from "./Duration";
import { durationDefaultContentItem, fechaCreacionDefault, FechaCreacionSinceDefault, FechaCreacionUntilDefault, IContentItemRating, IContentType, maxDurationUntil, maxDurationVideo, maxFechaCreacion, maxFechaCreacionSince, maxRatingFilter, minDurationSince, minDurationVideo, minFechaCreacion, minFechaCreacionSince, minRatingFilter, RatingDefault } from "./Interfaces";


const customLogger = new CustomLogger();

export class ContentItem {
    
    private _id: number     
    private _title: string;
    private _description: string;
    private _contentType: IContentType;
    private _tags: Array<string>;
    private _duration: Duration;
    private _rating: IContentItemRating;
    private _fechaCreacion: Date;
    private _videoUrl: string | null;
    
    /**
     * 
     * @param title  Titulo.
     * @param description Descripcion.
     * @param contentType tipo de contenido : IContentType.
     * @param tags etiquetas para categorizar el contentItem.
     * @param duration duración.
     * @param rating ranking personal.
     * @param fechaCreacion fecha que fue creado.
     */
    constructor(id: number = 0, title: string = "",  description: string = "", contentType: IContentType = IContentType.Web, tags: Array<string> = [], duration: Duration = durationDefaultContentItem, rating: IContentItemRating = RatingDefault,
        fechaCreacion: Date = fechaCreacionDefault, videoUrl: string | null = null
    ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._contentType = contentType;
    this._tags = tags;
    this._duration = duration;
    this._rating = rating;
    this._fechaCreacion = fechaCreacion;
    this._videoUrl = videoUrl;
    }

    
    set id(id: number) {
      this._id = id; 
    }

    
    get id(): number{
      return this._id
    }
  
 
    /**
     * Setear el titulo del contentItem
     * @param title: Titulo
     */
    set title(title: string) {
        this._title = title;
    }

    /**
     * @return title del contentItem.
     */
    get title() : string{
        return this._title
    }

    /**
    * Setear la descripción del contentItem
    * @param description: descripción.
    */
    set description(description: string) {
        this._description = description;
    }

    /**
     * @return description del contentItem
     */
    get description() : string {
        return this._description
    }

  
    /**
     * Verifica si contiene  titulo o descripcion.
     * @param titleOrDescription: string 
     * @return Boolean. 
     */
    containDescriptionOrTitle(titleOrDescription: string) : Boolean {
    
        if (this._title.toLowerCase().includes(titleOrDescription.toLowerCase())) {
            return true
        } else if (this._description.toLowerCase().includes(titleOrDescription.toLowerCase())){
            return true
        } else {
            return false
        }

    }
    
    /**
     * Setear el tipo de contenido del contentItem
     * @param contentType Tipo de contenido : IContentType
     */
    set contentType(contentType: IContentType) {
        this._contentType = contentType;
    }

    /**
     * @return tipo de contenido del contentItem
     */
    get contentType() : IContentType {
        return this._contentType
    }

    /**
     * Setear los tags del contentItem
     * @param tags: etiquetas.
     */
    set tags(tags: string[]) {
        this._tags = tags;
    }

    /**
     * @return tags del contentItem
     */
    get tags() : string[] {
        return this._tags
    }
    
    /**
     * Agrega 1 etiqueta al contentItem
     * @param tag : Etiqueta a agregar.
     */
    addTag(tag: string) {

        if (this._tags.toString().toLocaleLowerCase().includes(tag)) {
            customLogger.logDebug("Ya existe esta etiqueta")
            throw new ErrorExternoAlPasarParams(`Ya existe esta etiqueta`)
        } else {
            this._tags.push(tag);
        }
        
        customLogger.logDebug(`Se ha agregado ${tag}. El nuevo tagArray es:${this._tags}`)
    }
    
    /**
     * Elimina una etiqueta del contentItem
     * @param tag : Etiqueta a eliminar.
     */
    removeTag(tag: string) {

        if (this.containTags([tag])) {
            var index = this._tags.indexOf(tag);
            this._tags.splice(index, 1);
            
            customLogger.logDebug(`Se ha removido ${tag}. El nuevo tagArray es:${this._tags}`)
        } else {
            throw new ErrorExternoAlPasarParams(`No existe la etiqueta ${tag} que se quiso eliminar.`)
        }
    }

    /**
     * Verifica si contiene TODAS las etiquetas.
     * @param tagArr string[];
     * @returns True or False.
     */
    containsEveryTags(tagArr: Array<string>): Boolean {

        let response = containsEveryElements(tagArr, this._tags)
        
        function containsEveryElements(array: string[], target: string[]) {

            if (target.every(element => array.includes(element))) {
                return true
            } else {
                return false
            }
        }
        return response;
    }

    /**
     * Verifica si contiene AL MENOS UNA de las etiquetas.
     * @param tagArr string[]
     * @returns True or false
     */
    containTags(tagArr: Array<string>): Boolean {
        
        let response = containsAtLeastOneElementTrue(tagArr, this._tags)
       
        function containsAtLeastOneElementTrue(array1: string[], array2: string[]) {
           
            for (let i = 0; i < array1.length; i++) {
               
                for (let j = 0; j < array2.length; j++) {
                    if (array1[i].toLowerCase() === array2[j].toLowerCase()) {
                        return true;
                    }
                }
            }
            return false;
        }
        return response
    }

  
    /**
     * Setea la duration del ContentItem.
     * ! > maxDuration | < minDuration
     * @param duration duration del contentItem :Duration 
     */
    set duration(duration: Duration) {
        
        if (duration > maxDurationVideo || duration < minDurationVideo) {
            throw new ErrorExternoAlPasarParams(`La duracion debe estar entre ${maxDurationVideo} y ${minDurationVideo} `)
        }
        this._duration = duration
    }

    /**
     * @return la duration del contentItem.
     */
    get duration() : Duration{
        return this._duration
    }

    /**
     * Verificar si el contenido se encuentra entre los 2 parametros de duracion.
     * 
     * @param durationSince: Duration =  MinDurationUntil
     * @param durationUntil: Duration =  MaxDurationUntil
     * @returns Boolean
     */
    
    containsItemsBetweenTwoDurations(durationSince: Duration = minDurationSince, durationUntil: Duration = maxDurationUntil): Boolean {
            
        // Since > Until, throw Error.
        if ( durationUntil !== undefined && durationSince > durationUntil) {
            throw new ErrorExternoAlPasarParams((`Since: ${durationSince} , no puede ser menor a Until: ${durationUntil} .`))
        }

        // try {
            
            // ? Pasar a minutos las duraciones para comparar.
            let thisDurationInMinutes = this._duration.getDurationTotalInMinutes(this._duration) 
            let durationSinceMinutes = durationSince.getDurationTotalInMinutes(durationSince)
            let durationUntilMinutes = durationSince.getDurationTotalInMinutes(durationUntil)
            
            customLogger.logDebug(`Desde containsItemBetweenTwoDuration: thisDurationMinutes:${durationSinceMinutes}, durationSince ${durationSinceMinutes} y durationUntil ${durationUntilMinutes}`);
    
            // Ambos parametros existen.
            if (durationUntil !== undefined) {

                if ( durationSinceMinutes <= thisDurationInMinutes && thisDurationInMinutes <= durationUntilMinutes) {
                    return true
                } else { 
                    return false; 
                }
            }

            // Until no existe.
            else if (durationUntil === undefined) {
                if (durationSinceMinutes <= thisDurationInMinutes) {  
                    return true
                } else {
                    return false
                }
            }

            return false;         
    //     } catch (error) {
    //         throw new ErrorExternoAlPasarParams((` Error en containsItemsBetweenTwoDurations. durationSince ${JSON.stringify(durationSince)}, durationUntil ${JSON.stringify(durationUntil)}. Duration Item =${JSON.stringify(this._duration)}`))
            
    //    }
    }

    /**
     * Setea el ranking del ContentItem.
     * @param rating  rating del contentItem : IContentItemRating.
     */
    set rating(rating: IContentItemRating) {
        this._rating = rating;
    }

    /**
     * @return rating del contentItem.
     */
    get rating() : IContentItemRating {
        return this._rating;
    }

    
    /**
     * Verifica si existe entre los dos filtros.
     * 
     * @param ratingSince: IContentItemRating = minRatingFilter; 
     * @param ratingUntil: IContentItemRating = maxRatingFilter;
     * 
     * @return Boolean
     */
    containsRating(ratingSince: IContentItemRating = minRatingFilter, ratingUntil :IContentItemRating = maxRatingFilter) : Boolean{
        
        customLogger.logDebug(`Desde containsRating(), this._rating=${this._rating}, ratingSince=${ratingSince} y ratingUntil=${ratingUntil}`)
         
        // Ambos parametros existen.

        if (ratingSince !== undefined) {

            if ( this._rating >= ratingSince && this._rating <= ratingUntil) {
                return true
            } else { 
                return false; 
            }
        }

        
         // Until no existe.
        else if (ratingUntil === undefined) {
            if (ratingSince <= this._rating) {  
                return true
            } else {
                return false
            }
        }

        return false;  
             
    }

    /**
     * Setea la fecha de creación del ContentItem.
     * ! < minFechaCreacion ! > maxFechaCreacion
     * @param fechaCreacion: Date de creacion.
     */
    set fechaCreacion(fechaCreacion: Date) {
        if (fechaCreacion > maxFechaCreacion || fechaCreacion < minFechaCreacion) {
            throw new ErrorExternoAlPasarParams(`La fechaCreacion debe estar entre ${maxFechaCreacion} y ${minFechaCreacion} `)
        }
        this._fechaCreacion = fechaCreacion; 
    }

    get fechaCreacion() : Date {
        return this._fechaCreacion
    }

    /**
     * Verifica si el contentItem se encuentra en el rango de dos fechas.
     * ! > maxFechaCreacionSince ! < minFechaCreacionSince;
     * @param fechaCreacionSince : Date = FechaCreacionSinceDefault
     * @param fechaCreacionUntil : Date = FechaCreacionUntilDefault
     * @returns boolean
     */
    containsFechaCreacion(fechaCreacionSince: Date = FechaCreacionSinceDefault, fechaCreacionUntil: Date = FechaCreacionUntilDefault) : Boolean{
        
        //? Nueva Forma
          let fechaCreacionSinceFormateada = fechaCreacionSince.getTime(); 
        let fechaCreacionUntilFormateada = fechaCreacionUntil.getTime();
        let fechaCreacionFormateada = this._fechaCreacion.getTime();

        customLogger.logDebug(`Desde containsFechaCreacion(), this._fechaCreacion=${this._fechaCreacion}, fechaCreacionSince=${fechaCreacionSince} y fechaCreacionUntil=${fechaCreacionUntil}`)

         if (fechaCreacionSinceFormateada > maxFechaCreacionSince.getTime() || fechaCreacionSinceFormateada < minFechaCreacionSince.getTime()) {
            throw new ErrorExternoAlPasarParams(`AAAA La fechaCreacionSince debe estar entre ${minFechaCreacionSince} y ${maxFechaCreacionSince}. Actual: ${fechaCreacionSince}, ${fechaCreacionUntil} `)
        }

        // Ambos parametros existen.
        if (fechaCreacionSince !== undefined) {

            if ( fechaCreacionSinceFormateada <= fechaCreacionFormateada && fechaCreacionFormateada <= fechaCreacionUntilFormateada) {
                return true
            } else { 
                return false; 
            }
        }

         // Until no existe.
        else if (fechaCreacionUntil === undefined) {
            if (fechaCreacionSinceFormateada <= fechaCreacionFormateada) {  
                return true
            } else {
                return false
            }
        }

        //? Vieja Forma
        // customLogger.logDebug(`Desde containsFechaCreacion(), this._fechaCreacion=${this._fechaCreacion}, fechaCreacionSince=${fechaCreacionSince} y fechaCreacionUntil=${fechaCreacionUntil}`)
         
        //  if (fechaCreacionSince > maxFechaCreacionSince || fechaCreacionSince < minFechaCreacionSince) {
        //     throw new ErrorExternoAlPasarParams(`La fechaCreacionSince debe estar entre ${minFechaCreacionSince} y ${maxFechaCreacionSince} `)
        // }

        // // Ambos parametros existen.
        // if (fechaCreacionSince !== undefined) {

        //     if ( fechaCreacionSince <= this._fechaCreacion && this._fechaCreacion <= fechaCreacionUntil) {
        //         return true
        //     } else { 
        //         return false; 
        //     }
        // }

        //  // Until no existe.
        // else if (fechaCreacionUntil === undefined) {
        //     if (fechaCreacionSince <= this._fechaCreacion) {  
        //         return true
        //     } else {
        //         return false
        //     }
        // }
        
        return false;       
    }

    set videoUrl(videoUrl: string | null) {
        this._videoUrl = videoUrl;
    }

    get videoUrl(): string | null{
        return this._videoUrl; 
    }
    
    toString(): string {
        return `ContentItem: Title=${this._title}, ContentType=${this._contentType}, Duration=${JSON.stringify(this._duration)}, fechaCreacion=${this._fechaCreacion}, rating=${this._rating}, tags=${this._tags}, descripcion=${this._description}`
    }
};


