const InputStreamReader = Java.type("java.io.InputStreamReader");
const BufferedReader = Java.type("java.io.BufferedReader");
const Collectors = Java.type("java.util.stream.Collectors");

/**
 * A request object that provides an express like abstraction on top of the Java HttpExchange
 */
class RequestObject {
    private httpImp: any;

    constructor(t: any) {
        this.httpImp = t;
    }
    /**
     * Get the body of the request
     * @returns The body in plain text, so if you are expecting JSON, you will need to parse it yourself
     */
    get body() {
        const isr = new InputStreamReader(this.httpImp.getRequestBody(), "utf-8");
        const reader = new BufferedReader(isr);
        const body = reader.lines().collect(Collectors.joining("\n"));
        isr.close();
        reader.close();

        return body;
    }
    /**
     * Get the headers of the request
     * @returns An object with the headers, the keys are lowercase
     */
    get headers() {
        const headersMap = this.httpImp.getRequestHeaders();
        const headersObj = {};
        const headersObjLC = {};
        for (let entry of headersMap.entrySet()) {
            // If the header has multiple values, join them with ','
            headersObj[entry.getKey()] = Array.isArray(entry.getValue()) ? entry.getValue().join(',') : entry.getValue();

        }
        for (let key of Object.keys(headersObj)) {
            let v = headersObj[key];
            headersObj[key] = v[0]
            headersObjLC[key.toLowerCase()] = v[0]
        }
        return headersObjLC;
    }
    /**
     * Get the HTTP method of the request
     * @returns The HTTP method
     */
    get method() {
        return this.httpImp.getRequestMethod();
    }
    /**
     * Get the URL of the request
     * @returns The URL
     */
    get url() {
        return this.httpImp.getRequestURI().toString();
    }

}

export default RequestObject;