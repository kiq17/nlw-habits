import { FastifyInstance } from "fastify";
import {
    summaryController,
    graphController,
    toggleController,
    dayController,
    createDayController
} from "../controllers";


export const appRoute = async (app: FastifyInstance) => {
    app.post("/criar", createDayController);

    app.get("/day", dayController);

    app.patch("/habit/:id/toggle", toggleController);

    app.get("/summary", summaryController);

    app.get("/graph", graphController);
};