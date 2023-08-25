import axios, { AxiosResponse } from "axios";

export async function GetTodo():Promise<AxiosResponse<any>  | any> {
    try {
        const res = await axios.get("/api");
        return res.data;
    } catch (error:any) {
        return error;
    }
}