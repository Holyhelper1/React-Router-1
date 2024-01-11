import style from "./components.module.css";
import { useEffect, useState } from "react";

export const NewTask = () => {
  const [newTask, setNewTask] = useState([]);

  const addNewTask = () => {
    fetch("http://localhost:3005/todos", {
      method: "POST",
      body: JSON.stringify({
        title: "Новая заметка",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Новая задача создана", response);
        setNewTask((prevTasks) => [...prevTasks, response]);
      });
  };

  useEffect(() => {
    console.log("Новая задача создана", newTask);
    
  }, [newTask]);

  return (
    <div>
      <button onClick={addNewTask} className={style.buttonEdit}>
        Add new task
      </button>
    </div>
  );
};