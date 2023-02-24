/**
 * @summary Stores the HTTP error message to be sent to client
 */
export class HTTPError {
    // MEMBER DATA
    public status: number;                                              // To store http status code
    public message: string;                                             // To store error message
    public time: number;                                                // To store the timestamp when the error originated
    
    // MEMEBER METHODS
    /**
     * @param message The error message
     */
    constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
        this.time = Date.now();
    }
}

/**
 * @summary Stores the response to be sent back
 */
export class HTTPResponse<DataType> {
    // MEMBER DATA
    public success: boolean;                                            // To store if request was successful or not
    public data?: DataType;                                             // To store the reponse data, if any
    public error?: HTTPError;                                           // To store error if any

    // MEMBER METHODS
    /**
     * @param success Whether the request was successful or not
     * @param data The data to be returned, if any
     * @param error The error, if any
     */
    constructor(success: boolean, data?: DataType, error?: HTTPError) {
        this.success = success;
        this.data = data;
        this.error = error;
    }
}