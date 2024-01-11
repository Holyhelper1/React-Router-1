import { useParams } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { useNavigate } from "react-router-dom";
import  styles   from './components.module.css'

export const PageTodos = () => {
    const { id } = useParams();
    const { getTodosById } = useTodos();
    const todos = getTodosById(id);
    const navigate = useNavigate();

    

  
    return ( 
        <div >
            <button onClick={() => navigate(`/todos`)} className={styles.buttonEdit}>Back</button>
            <button onClick={() => navigate(`/todos/${id}/edit`)} className={styles.buttonEdit}> Edit</button>
            <h3>{todos.title}</h3>

        </div>
    );
}