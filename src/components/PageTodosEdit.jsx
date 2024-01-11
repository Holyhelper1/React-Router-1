import { useTodos } from "../hooks/useTodos";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  styles   from './components.module.css'
export const PageTodosEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editTodo, getTodosById, requestDeleteTask } = useTodos();
  const todo = getTodosById(id);
  const [data, setData] = useState({ ...todo });

  const handleSubmit = async (event) => {
event.preventDefault();
    await editTodo(id, data);
    navigate(`/todos/${id}`);
    
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prevState) => ({
    ...prevState,
        [name]: value,
    }));
  };
  const handleDelete = async () => {
    await requestDeleteTask(id);
  }

  return (
    <div>
      <form>
        <textarea
        className={styles.inputSearch}
          type="text"
          value={data.title}
          onChange={handleChange}
          name="title"
        />
        <button onClick={handleSubmit} className={styles.buttonEdit} >Edit</button>
        <button onClick={() => navigate(`/todos/${id}`)} className={styles.buttonDelete}>Cancel</button>
        <button onClick={() => navigate(`/todos`)} className={styles.buttonEdit}>Todos list</button>
        <button onClick={handleDelete} className={styles.buttonDelete}>Delete task</button>
      </form>
    </div>
  );
};
