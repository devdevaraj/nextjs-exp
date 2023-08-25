"use client"
import { FormEvent, useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { GetTodo, SetTodo } from "@/helpers/helper";

type todoType = {
  todo: string
}

export default function Home() {
  const [data, setData]: [todoType[], Function] = useState([]);
  
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo:string = (e.target as HTMLFormElement).todo.value;
    const todoObj:todoType = { todo };
    SetTodo(todoObj)
    .then((res:AxiosResponse<any>) => {
      console.log(res);
      setData([...data,todoObj]);
    })
    .catch((error:any) => {
      console.log(error);
      
    })
  }
  useEffect(() => {
    GetTodo()
      .then((res: AxiosResponse<any>) => {
        setData(res);
      })
      .catch((error: any) => {
        console.log(error);
      })
  }, []);
  return (
    <main className="container">
      <form onSubmit={submitHandler} className="add-todo">
        <input type="text" name="todo" id="todo" />
        <button>ADD</button>
      </form>
      <ol>
      {data?.map((todo, index) => (
        <li key={index}>{todo?.todo}</li>
        ))}
        </ol>
    </main>
  )
}
