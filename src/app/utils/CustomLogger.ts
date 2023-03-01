export class CustomLogger{
    constructor() { }
    
    logInfo(message : string) {
        console.info(message)
    }

    logDebug(componente: string, message?: any, object?: any) {
        console.debug(`[${componente}]`, message ? message : "", object ? object : "")
    }

    // Todo error : Error
    logError(message: string , error?: any) {
        console.error(message, error)
        // throw new Error(message) No va aca... No es responsabilidad.
    }
}