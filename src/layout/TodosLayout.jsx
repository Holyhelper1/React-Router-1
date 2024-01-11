import React from "react";
import { useParams } from "react-router-dom";
import { PageTodosEdit } from "../components/PageTodosEdit";
import { PageTodos } from "../components/PageTodos";
import { PageTodosList } from "../components/PageTodosList";
import { TodosProvider } from "../hooks/useTodos";
import  styles   from '../components/components.module.css'
export const TodosLayout = () => {
  const { id, edit } = useParams();

  return (
    <TodosProvider>
      <div className={styles.todosText}>
        {id ? (
          edit === "edit" ? (
            <PageTodosEdit />
          ) : (
            <PageTodos />
          )
        ) : (
          <PageTodosList />
        )}
      </div>
    </TodosProvider>
  );
};
