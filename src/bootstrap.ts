import "reflect-metadata";

import "dotenv/config";

import express from "express";
import diContainer from "./data/di/diContainer";
import { DBContext } from "./data/local/DBContext";

import cors from "cors";

import dotenv from "dotenv";
import { InversifyExpressServer } from "inversify-express-utils";
import { pinoLogger } from "./core/middlewares/setup-pino";

export class App {
    public build() {
        const dbContext = diContainer.get(DBContext);

        const PORT = process.env.PORT || 5000;
        const router = express.Router({
            mergeParams: true,
        });
        dbContext.connect();
        dotenv.config();

        const server = new InversifyExpressServer(diContainer, router, {
            rootPath: "/v1",
        });

        server.setConfig((app) => {
            app.use(cors());
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            app.use(pinoLogger);
        });

        const application = server.build();

        const serverapp = application.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        serverapp.timeout = 60000;
    }
}

new App().build();
