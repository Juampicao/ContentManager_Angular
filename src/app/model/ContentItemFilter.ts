import { ErrorExternoAlPasarParams } from "../error/ErrorExternoAlPasarParams";
import { CustomLogger } from "../utils/CustomLogger";
import { Duration } from "./Duration";
import { FechaCreacionSinceDefault, FechaCreacionUntilDefault, IContentItemRating, IContentType, maxDurationSince, maxDurationUntil, maxFechaCreacionSince, maxFechaCreacionUntil, maxRatingFilter, minDurationSince, minDurationUntil, minFechaCreacionSince, minFechaCreacionUntil, minRatingFilter } from "./Interfaces";

let _customLogger = new CustomLogger();

export class ContentItemFilter {
 
    // private _title: string;
    protected _titleOrDescription: string ;
    protected _contentType!: IContentType;
    protected _tags: string[];
    protected _description: string;
    protected _durationSince: Duration;
    protected _durationUntil: Duration;
    protected _ratingSince: IContentItemRating
    protected _ratingUntil: IContentItemRating;
    protected _fechaCreacionSince: Date;
    protected _fechaCreacionUntil: Date;


    
    constructor() {
        this._titleOrDescription = "";
        this._contentType = IContentType.Void;
        this._tags = [];
        this._description = "";
        // this._durationSince = new Duration();
        // this._durationUntil = new Duration();
        this._durationSince = minDurationSince;
        this._durationUntil = maxDurationUntil;
        this._ratingSince = IContentItemRating.Void;
        this._ratingUntil = IContentItemRating.Void;
        this._fechaCreacionSince = FechaCreacionSinceDefault;
        this._fechaCreacionUntil = FechaCreacionUntilDefault;
    }

    /**
     * Setea el titulo o descripcion del filtro.
     * @param titleOrDescription : El titulo o la descripcion pueden ser ingresadas.
     */
    public set titleOrDescription(titleOrDescription: string) {

        let RegEx3Letters: RegExp = /(.*[a-z]){3}/i;

        if (RegEx3Letters.test(titleOrDescription)) {

            this._titleOrDescription = titleOrDescription.toLocaleLowerCase(); 
            
        } else {
            // throw new ErrorExternoAlPasarParams(`Debe contener al menos 3 letras.`)
            return
        }
    }

    /**
     * @return el titulo o la descripcion del filtro.
     */
    public get titleOrDescription() : string {
        return this._titleOrDescription.toLocaleLowerCase();
    }

    /**
     * Setear el tipo de contenido del filtro
     * @param contentType Tipo de contenido : IContentType
     */
    set contentType(contentType: IContentType) {
        this._contentType = contentType;
    }

    /**
     * @return el tipo de contenido del filtro.
     */
    public get contentType() : IContentType{
        return this._contentType
    }

    /**
     * Setea todos los tags del filtro
     * @param tags: Array de etiquetas. 
     */
    public set tags(tags: string[]) {
        this._tags = tags;
    }

    /**
     * @return todo el array de etiquetas del filtro.
     */
    public get tags(): string[] {
        return this._tags
    }

    /**
     * Setea la descripción del filtro.
     * @param description descripción del filtro.
     */
    public set description(description: string) {
        this._description = description.toLowerCase();
    };

    /**
     * @return la descripcion del filtro.
     */
    public get description() : string {
        return this._description.toLowerCase();
    }

    
    /**
     * Setea la duración desde, del filtro.
     * ! negativo ! <minDurationSince ! >maxDurationSince>
     * @param durationSince:Duration
     */
    public set durationSince(durationSince: Duration) {
        if (durationSince > maxDurationSince || durationSince < minDurationSince) {
            throw new ErrorExternoAlPasarParams(`La duracion debe estar entre ${minDurationSince} y ${maxDurationSince} `)
        }
        this._durationSince = durationSince
    }

    /**
     * @return la duración desde, del filtro.
     */
    public get durationSince() : Duration {
        return this._durationSince;
    }

    /**
    * Setea la duracion hasta del filtro.
    * ! negativo ! < minDurationUntil ! > maxDurationUntil
    * @param durationUntil:Duration
    */
    public set durationUntil(durationUntil: Duration) {
          if (durationUntil > maxDurationUntil || durationUntil < minDurationUntil) {
            throw new ErrorExternoAlPasarParams(`La duracion debe estar entre ${minDurationSince} y ${maxDurationSince} `)
        }
        this._durationUntil = durationUntil
    }

    /**
     * @return la duracion hasta del filtro.
     */
    public get durationUntil() : Duration {
        return this._durationUntil;
    }

    /**
    * Setea el rating desde del filtro.      
    * ! < minRatingFilter ! > maxRatingFilter
    * @param rating:IContentItemRating
    */
    public set ratingSince(rating: IContentItemRating) {
    
        if (rating > maxRatingFilter || rating < minRatingFilter) {
            throw new ErrorExternoAlPasarParams(`El rating debe estar entre ${minRatingFilter} y ${maxRatingFilter}. El rating filtrado actual es Desde:${this._ratingSince}  Hasta:${this._ratingUntil}`)
        }
        this._ratingSince = rating; 
    }

    /**
     * @return el ratingdesde del filtro.
     */
    public get ratingSince() : IContentItemRating {
        return this._ratingSince;
    }

    /**
     * Setea el rating hasta a buscar por el filtro.
     * ! < minRatingFilter ! > maxRatingFilter
     * @param rating:IContentItemRating
     */
    public set ratingUntil(rating: IContentItemRating) {

        if (rating > maxRatingFilter || rating < minRatingFilter) {
            throw new ErrorExternoAlPasarParams(`La duracion debe estar entre ${minRatingFilter} y ${maxRatingFilter} `)
        }
        this._ratingUntil = rating;
    }

    /**
     * @returns el rating hasta del filtro a buscar.
     */
    public get ratingUntil() : IContentItemRating{
        return this._ratingUntil;
    }
  

    /**
     * Setea la fecha de creacion desde a buscar por el filtro
     * ! <minFechaCreacionSince ! > maxFechaCreacionSince
     * @param fechaCreacionSince: Fecha desde.
     */
    public set fechaCreacionSince(fechaCreacionSince: Date) {
        
        _customLogger.logDebug(`ContentItemFilter, FechaCreacionSinceParam:${fechaCreacionSince}`)
        if (fechaCreacionSince > maxFechaCreacionSince || fechaCreacionSince < minFechaCreacionSince) {
            throw new ErrorExternoAlPasarParams(`La fechaCreacionSince debe estar entre ${minFechaCreacionSince} y ${maxFechaCreacionSince} `)
        }
        this._fechaCreacionSince = fechaCreacionSince;
    }

    /**
     * 
     * @returns la fecha de creacion desde a buscar por el filtro
     */
    public get fechaCreacionSince()  : Date {
        return this._fechaCreacionSince
    }

    /**
     * Setea la fecha de creacion hasta a buscar por el filtro
     * ! <minFechaCreacionUntil ! > maxFechaCreacionUntil
     * @param fechaCreacionUntil: Fecha hasta a buscar por el filtro.
     */
    public set fechaCreacionUntil(fechaCreacionUntil: Date) {

        _customLogger.logDebug(`ContentItemFilter, FechaCreacionUntilParam:${fechaCreacionUntil}`)
         if (fechaCreacionUntil > maxFechaCreacionUntil || fechaCreacionUntil < minFechaCreacionUntil) {
            throw new ErrorExternoAlPasarParams(`La fechaCreacionUntil debe estar entre ${minFechaCreacionUntil} y ${maxFechaCreacionUntil} `)
        }
        this._fechaCreacionUntil = fechaCreacionUntil;
    }

    /**
     * @returns fecha de creacion hasta a abuscar por el filtro.
     */
    public get fechaCreacionUntil() : Date {
        return this._fechaCreacionUntil
    }

    
    // ToString
    public toString() : string {
        return `ContentItemFilter: titleOrDescription=${this.titleOrDescription ? this.titleOrDescription : "undefined"}, contentType=${this._contentType ? this._contentType : "undefined"}, durationSince=${ this._durationSince ? JSON.stringify(this._durationSince) : "undefined"}, durationUntil=${ this._durationUntil ? JSON.stringify(this._durationUntil) : "undefiend"}, fechaCreacionSince=${this._fechaCreacionSince ? this._fechaCreacionSince : "undefined"}, fechaCreacionUntil=${this._fechaCreacionUntil ? this._fechaCreacionUntil : "undefined"}, ratingSince=${this._ratingSince ? this._ratingSince : "undefined"}, ratingUntil=${this._ratingUntil ? this._ratingUntil : "undefined"}, tags=${this._tags ? this._tags : "undefined"}` 
    }
}


export class ContentItemFilterExtends extends ContentItemFilter{

    constructor(titleOrDescription: string = "", contentType: IContentType = IContentType.Void, tags: string[] = [], description: string = "", durationSince: Duration = new Duration(), durationUntil: Duration = new Duration(), ratingSince: IContentItemRating = IContentItemRating.Void, ratingUntil = IContentItemRating.Void, fechaCreacionSince: Date = FechaCreacionSinceDefault, fechaCreacionUntil: Date = FechaCreacionUntilDefault) {
        super()
            this._titleOrDescription = titleOrDescription;
            this._contentType = contentType;
            this._tags = tags;
            this._description = description;
            this._durationSince = durationSince;
            this._durationUntil = durationUntil;
            this._ratingSince = ratingSince;
            this._ratingUntil = ratingUntil;
            this._fechaCreacionSince = fechaCreacionSince;
            this._fechaCreacionUntil = fechaCreacionUntil;
    }
}

