"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { PrismaClient } from '@prisma/client';
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
//import https from "https";
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dev = process.env.NODE_ENV !== "production";
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const port = 3000;
const Todos = [
    {
        todo: "Todo 1"
    },
    {
        todo: "Todo 2"
    }
];
(async () => {
    try {
        await app.prepare();
        const server = (0, express_1.default)();
        const httpServer = http_1.default.createServer(server);
        const io = new socket_io_1.Server(httpServer);
        server.use(express_1.default.json());
        server.use(express_1.default.urlencoded({
            extended: true
        }));
        server.get("/api/get-todo", (req, res) => {
            return res.status(200).send(Todos);
        });
        server.post("/api/set-todo", (req, res) => {
            const todo = req.body;
            console.log(todo);
            Todos.push(todo);
            return res.status(200).send({ msg: "todo set successfully!!!" });
        });
        server.all("/*", (req, res) => {
            return handle(req, res);
        });
        io.on('connection', (socket) => {
            console.log("One user connected!");
            socket.on('disconnect', () => {
                console.log("User disconnected!");
            });
        });
        httpServer.listen(port, (err) => {
            if (err)
                throw err;
            console.log(`> Ready on localhost: ${port} - env${process.env.NODE_ENV}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
    finally {
        (async () => {
            console.log("Prisma disconnect");
            //await prisma.$disconnect();
        })();
    }
})();
