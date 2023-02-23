/**
 * @summary Stores the HTTP error message to be sent to client
 */
export class HTTPError {
    // MEMBER DATA
    public message: string;                                             // To store error message
    public fields?: {
        name: string,
        value: string
    }[];                                                                // To store the error causing fields
    public time: number;                                                // To store the timestamp when the error originated
    
    // MEMEBER METHODS
    /**
     * @param message The error message
     * @param fields The error causing fields, if any
     */
    constructor(message: string, fields?: { name: string, value: string }[]) {
        this.message = message;
        this.fields = fields;
        this.time = Date.now();
    }
}