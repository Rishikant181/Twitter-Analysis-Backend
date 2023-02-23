export class HTTPError {
    // MEMBER DATA
    public status: number;                                              // To store HTTP status code
    public message: string;                                             // To store error message
    public fields?: string[];                                           // To store the error causing fields
    public time: number;                                                // To store the timestamp when the error originated
    
    // MEMEBER METHODS
    /**
     * @param status The HTTP status code
     * @param message The error message
     * @param fields The error causing fields, if any
     */
    constructor(status: number, message: string, fields?: string[]) {
        this.status = status;
        this.message = message;
        this.fields = fields;
        this.time = Date.now();
    }
}