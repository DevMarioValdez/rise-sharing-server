import pino from "pino";
import { pinoHttp } from "pino-http";
import { v4 as UUID } from "uuid";

export const pinoLogger = pinoHttp({
    // Reuse an existing logger instance
    logger: pino(),

    // Define a custom request id function
    genReqId: function (req, res) {
        const existingID = req.id ?? req.headers["x-request-id"];
        if (existingID) return existingID;
        const id = UUID();
        res.setHeader("X-Request-Id", id);
        return id;
    },

    // Define custom serializers
    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
    },
    // Set to `false` to prevent standard serializers from being wrapped.
    wrapSerializers: true,

    // Define a custom logger level
    customLogLevel: function (req, res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return "warn";
        } else if (res.statusCode >= 500 || err) {
            return "error";
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
            return "silent";
        }
        return "info";
    },

    // Override attribute keys for the log object
    customAttributeKeys: {
        req: "request",
        res: "response",
        err: "error",
        responseTime: "timeTaken",
    },
});
