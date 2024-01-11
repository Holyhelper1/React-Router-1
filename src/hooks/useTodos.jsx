import { createContext, useContext, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

const TodosContext = createContext({});

export const useTodos = () => {
  return useContext(TodosContext);
};

export const TodosProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [originalTasks, setOriginalTasks] = useState([]);
  const [sort, setSort] = useState("");
  const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search , setSearch] = useState("");
  const debounceValue = useDebounce(search, 2000);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const loadTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(" http://localhost:3005/todos");
      const data = await response.json();
      setIsLoading(false);

      setTodos(data);
    } catch (error) {}
  };

  const getTodosById = (id) => {
    return todos.find((todo) => todo.id === Number(id));
  };

  const editTodo = async (id, payload) => {
    try {
      const response = await fetch(` http://localhost:3005/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const updateDate = await response.json();
      const updatedArray = todos.map((todo) => {
        if (todo.id === Number(id)) {
          todo = updateDate;
        }
        return todo;
      });
      setTodos(updatedArray);
    } catch (error) {}
  };

  const requestDeleteTask = (id) => {
    fetch(`http://localhost:3005/todos/${id}`, {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача удалена", response);
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .finally(() => {
        console.log("Задача удалена");
      });
  };

  const handleSort = () => {
    if (sort === "") {
      const sortedTasks = [...tasks].sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      setTasks(sortedTasks);
      setSort("asc");
    } else {
      setTasks(originalTasks);
      setSort("");
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);
  return (
    <TodosContext.Provider
      value={{ todos, getTodosById, editTodo, requestDeleteTask, handleSort, handleChangeSearch }}>
      {isLoading ? <p>Loading...</p> : children}
    </TodosContext.Provider>
  );
};
