"use client";
import { FormEvent, useState, useEffect } from "react";
import { AxiosResponse } from "axios";
//import { io } from 'socket.io-client';
import { GetTodo, SetTodo } from "@/helpers/helper";
import { socket } from "@/socket";

type todoType = {
  todo: string;
};

export default function Home() {
  //const socket = io();
  const [data, setData]: [todoType[], Function] = useState([]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo: string = (e.target as HTMLFormElement).todo.value;
    const todoObj: todoType = { todo };
    socket.emit("todo msg", todoObj);
    SetTodo(todoObj)
      .then((res: AxiosResponse<any>) => {
        console.log(res);
        //setData([...data,todoObj]);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const handleMessage = (msg) => {
      setData((pre) => [...pre, msg]);
    };
    socket.on("todo msg", handleMessage);
    return () => {
      socket.off("todo msg", handleMessage);
    };
  }, [data]);

  useEffect(() => {
    socket.connect();
    GetTodo()
      .then((res: AxiosResponse<any>) => {
        setData(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return () => {
      socket.disconnect();
    };
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
  );
}
