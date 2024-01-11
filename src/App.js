import { Routes, Route } from "react-router-dom";
import "./App.css";
import { PageTodosList } from "./components/PageTodosList.jsx";
import { TodosLayout } from "./layout/TodosLayout.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Main</h1>} />
        <Route path="/todos/:id?/:edit?" element={<TodosLayout />} />
      </Routes>
    </div>
  );
}

export default App;
