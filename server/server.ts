import express, { Request, Response } from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

(async () => {
    try {
        await app.prepare();
        const server = express();
        server.get("/api",(req: Request, res: Response) => {
            return res.json("Hellow this is awsome");
        })
        server.all("/*", (req: Request, res: Response) => {
            return handle(req,res);
        });
        server.listen(port, (err?: any) => {
            if(err) throw err;
            console.log(`> Ready on localhost: ${port} - env${process.env.NODE_ENV}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);   
    }
})();