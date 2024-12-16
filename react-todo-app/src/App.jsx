import { useState, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import List from "./components/List";
import "./styles/todo.css";

const App = () => {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [currentId, setCurrentId] = useState(0);
  const [filter, setFilter] = useState("all");
  const inputRef = useRef(null);

  const handleAddTodo = () => {
    const inputValue = inputRef.current.value;
    setTodo((prevTodo) => [
      ...prevTodo,
      { id: currentId + 1, text: inputValue, completed: false },
    ]);
    setCurrentId((prevId) => prevId + 1);
    setInput("");
  };

  const handleDeleteTodo = (id) => {
    setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const handleToggleCompleted = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todo.filter((item) => {
    if (filter === "all") return true;
    if (filter === "done") return item.completed;
    if (filter === "todo") return !item.completed;
  });

  return (
    <>
      <div className="todo">
        <div className="container">
          <div className="todo__content">
            <h1>Let's add what you have to do</h1>
            <p>
              Fill the input and click button or "Enter" to add a new task into
              the list
            </p>
            <p>To mark as completed, just click directly to the task.</p>
          </div>
          <div className="todo__input">
            <input
              type="text"
              placeholder="Add Todo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={inputRef}
            />
            <button onClick={handleAddTodo}>
              <IoMdAdd />
            </button>
          </div>

          <div className="todo__list">
            <List
              todo={filteredTodos}
              filter={filter}
              setFilter={setFilter}
              handleDeleteTodo={handleDeleteTodo}
              handleToggleCompleted={handleToggleCompleted}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
