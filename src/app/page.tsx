"use client"
import { FormEvent, useState, useEffect } from "react";

import { GetTodo } from "@/helpers/helper";

export default function Home() {
  const [data,setData] = useState([]);
  const submitHandler = (e:FormEvent<HTMLFormElement>) => {
    console.log(e);
  }
  return (
    <main className="container">
      <form onSubmit={submitHandler} className="add-todo">
        <input type="text" name="todo" id="todo" />
        <button>ADD</button>
      </form>
      <p>todo</p>
    </main>
  )
}
