import express, { Request, Response } from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port:number = 3000;

type todoType = {
    todo: string
}
const Todos:todoType[] = [
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
        const server = express();
        server.use(express.json());
        server.use(express.urlencoded({
            extended: true
        }));
        server.get("/api/get-todo",(req: Request, res: Response) => {
            return res.status(200).send(Todos);
        })
        server.post("/api/set-todo",(req: Request, res: Response) => {
            const todo:todoType = req.body;
            console.log(todo);
            Todos.push(todo);
            
            return res.status(200).send({ msg: "todo set successfully!!!"});
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