import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { appRoute } from "./routes/habitRoute";


class App{
    public server: FastifyInstance;

    constructor(){
        this.server = fastify();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.register(cors);

    }

    routes(){
        this.server.register(appRoute);
    }
}




export default new App().server;
