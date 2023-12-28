/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
// Generated by CT-Pack
const HttpServer = Java.type("com.sun.net.httpserver.HttpServer");
const HttpHandler = Java.type("com.sun.net.httpserver.HttpHandler");
const INetSocketAddress = Java.type("java.net.InetSocketAddress");



import ResponseObject from "./lib/ResponseObject";
import RequestObject from "./lib/RequestObject";

import type { InternalMethods, HTTPVerb } from "./lib/types";

/**
 * A simple HTTP server that provides an express like abstraction on top of the Java HttpServer
 * NOTE: This only superficially resembles express, existing express code probably might not work and not all features are supported. Middleware is not supported.
 * @example
 * const server = new Server(8080);
 * server.get("/test", (req, res) => {
 *    res.status(200)
 *   res.send("Hello World!");
 * });
*/
class HTTPServer {
    port: number;
    server
    private internalMethods: InternalMethods = {};
    private internalTrigger

    /**
     * Create a new server. This does not start the server, you need to call listen() for that
     */
    constructor() {
        this.port = 0;
        this.server = null;
    }
    /**
     * Listen on the specified port. The server will automatically stop when the game unloads (this includes reloading ct)
     * @param port The port to listen on
     */
    listen(port: number, callback?: () => void) {
        this.port = port;
        this.server = HttpServer.create(new INetSocketAddress(port), 0);
        Object.keys(this.internalMethods).forEach((path) => {
           // Create one total context for each path that will handle all supported verbs
            this.server.createContext(path, new HttpHandler({
                handle: (t) => {
                    const req = new RequestObject(t);
                    const res = new ResponseObject(t);
                    // Find the correct handler for the verb
                    const handler = this.internalMethods[path].find((h) => h.verb == req.method)
                    if (handler) {
                        handler.callback(req, res)
                    } else {
                        // If no handler is found, send a method not allowed
                        res.status(405).send(`Cannot ${req.method} ${path}`)

                    }
                }
            }));
        })
        this.server.start()
        this.internalTrigger = register("gameUnload", () => this.server.stop(0))
        if (callback) try { callback() } catch (e) { console.error(e) }
    }
    /**
     * Register a handler for a GET request
     * @param path The path to register the handler for
     * @param callBack The handler
     */
    get(path: string, callBack: (req: RequestObject, res: ResponseObject) => void) {
        this.internalMethods[path] = this.internalMethods[path] || [];
        this.internalMethods[path].push({
            verb: "GET",
            callback: callBack
        })
        return this;
    }
    /**
     * Register a handler for a POST request
     * @param path The path to register the handler for
     * @param callBack The handler
     */
    post(path: string, callBack: (req: RequestObject, res: ResponseObject) => void) {
        this.internalMethods[path] = this.internalMethods[path] || [];
        this.internalMethods[path].push({
            verb: "POST",
            callback: callBack
        })
        return this;
    }
    /**
     * Register a handler for a PUT request
     * @param path The path to register the handler for
     * @param callBack The handler
     */
    put(path: string, callBack: (req: RequestObject, res: ResponseObject) => void) {
        this.internalMethods[path] = this.internalMethods[path] || [];
        this.internalMethods[path].push({
            verb: "PUT",
            callback: callBack
        })
        return this;
    }
    /**
     * Register a handler for a DELETE request
     * @param path The path to register the handler for
     * @param callBack The handler
     */
    delete(path: string, callBack: (req: RequestObject, res: ResponseObject) => void) {
        this.internalMethods[path] = this.internalMethods[path] || [];
        this.internalMethods[path].push({
            verb: "DELETE",
            callback: callBack
        })
        return this;
    }
    /**
     * Register a handler for a PATCH request
     * @param path The path to register the handler for
     * @param callBack The handler
     */
    patch(path: string, callBack: (req: RequestObject, res: ResponseObject) => void) {
        this.internalMethods[path] = this.internalMethods[path] || [];
        this.internalMethods[path].push({
            verb: "PATCH",
            callback: callBack
        })
        return this;
    }
    /**
     * Register a handler for a HEAD request
     * @param path The path to register the handler for
     * @param callBack The handler
     */
    head(path: string, callBack: (req: RequestObject, res: ResponseObject) => void) {
        this.internalMethods[path] = this.internalMethods[path] || [];
        this.internalMethods[path].push({
            verb: "HEAD",
            callback: callBack
        })
        return this;
    }
    /**
     * Register a handler for a OPTIONS request
     * @param path The path to register the handler for
     * @param callBack The handler
     */
    options(path: string, callBack: (req: RequestObject, res: ResponseObject) => void) {
        this.internalMethods[path] = this.internalMethods[path] || [];
        this.internalMethods[path].push({
            verb: "OPTIONS",
            callback: callBack
        })
        return this;
    }
    /**
     * Register a handler for a CONNECT request
     * @param path The path to register the handler for
     * @param callBack The handler
     */
    connect(path: string, callBack: (req: RequestObject, res: ResponseObject) => void) {
        this.internalMethods[path] = this.internalMethods[path] || [];
        this.internalMethods[path].push({
            verb: "CONNECT",
            callback: callBack
        })
        return this;
    }
    /**
     * Register a handler for a TRACE request
     * @param path The path to register the handler for
     * @param callBack The handler
     */
    trace(path: string, callBack: (req: RequestObject, res: ResponseObject) => void) {
        this.internalMethods[path] = this.internalMethods[path] || [];
        this.internalMethods[path].push({
            verb: "TRACE",
            callback: callBack
        })
        return this;
    }
    /**
     * Stop the server
     */
    stop() {
        this.server.stop(0);
        this.internalTrigger.unregister();
    }
    

     


    
}

export default HTTPServer;
