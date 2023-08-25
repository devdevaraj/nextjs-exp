"use client"
import axios, { AxiosResponse } from "axios";

type todoType = {
    todo: string
  }

export async function GetTodo():Promise<AxiosResponse<any>  | any> {
    try {
        const res:AxiosResponse<any> = await axios.get("/api/get-todo");
        return res.data;
    } catch (error:any) {
        return error;
    }
}

export async function SetTodo(todo:todoType):Promise<AxiosResponse<any>  | any> {
    try {
        const res:AxiosResponse<any> = await axios.post("/api/set-todo",todo);
        return res.data;
    } catch (error:any) {
        return error;
    }
}