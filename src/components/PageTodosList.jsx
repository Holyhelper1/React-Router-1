import { useTodos } from "../hooks/useTodos";
import { Link } from "react-router-dom";
import { CurrentTime } from "./CurrentTime";
import styles from "./components.module.css";
import { NewTask } from "./NewTask";

export const PageTodosList = () => {
  const { todos, handleSort, handleChangeSearch } = useTodos();

  const handleSorting = () => {
    handleSort();
  };

  return (
    <div className={styles.app_header}>
      <div className={styles.searchWrapper}>
        <CurrentTime />
        <input
          className={styles.inputSearch}
          type="text"
          placeholder="Search..."
          handleChangeSearch={handleChangeSearch}
        />
        <input
          type="checkbox"
          className={styles.abcSearch}
          onClick={handleSorting}
        />
        <p className={styles.abcText}>Sort by Abc</p>

        <NewTask />
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className={styles.todosText}>
          <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
        </div>
      ))}
    </div>
  );
};
