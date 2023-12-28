import RequestObject from "./RequestObject"
import ResponseObject from "./ResponseObject"

export type HTTPVerb = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE"
export interface InternalMethods {
    [path: string]: {
        verb: HTTPVerb,
        callback: (req: RequestObject, res: ResponseObject) => void

    }[]
}