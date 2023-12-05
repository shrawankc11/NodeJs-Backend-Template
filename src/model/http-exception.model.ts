interface HttpException {
    statusCode: number;
    message: string;
}

class HttpException extends Error implements HttpException {
    public statuCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statuCode = statusCode;
    }
}

export default HttpException;