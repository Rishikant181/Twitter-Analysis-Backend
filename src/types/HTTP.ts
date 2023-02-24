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