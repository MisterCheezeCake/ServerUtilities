const JavaString = Java.type("java.lang.String");
/**
 * A response object that provides an express like abstraction on top of the Java HttpExchange
 */
class ResponseObject {
    private httpImp: any;
    private InternalStatus: number

    constructor(t: any) {
        this.httpImp = t;
        this.InternalStatus = 200;
    }/**
     * Set the HTTP Status code of the response
     * @param code The HTTP Status code
     * @returns this for chaining
     */
    status(code: number) {
        this.InternalStatus = code;
        return this;
    }
    /**
     * Send a string as the response body
     * @param data The response body
     * @param code Optional HTTP Status code, defaults to 200 or the last status code set by status()
     * @returns this for chaining
     */
    send(data: string, code: number = this.InternalStatus) {
        this.httpImp.sendResponseHeaders(code, 0);
        const out = this.httpImp.getResponseBody();
        out.write(new JavaString(data).getBytes());
        out.close();
        return this;
    }
    /**
     * Set a header on the response
     * @param key Header name
     * @param value Header value
     * @returns this for chaining
     */
    header(key: string, value: string) {
        this.httpImp.getResponseHeaders().set(key, value);
        return this;
    }


}

export default ResponseObject;