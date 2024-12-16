import { MdDelete } from "react-icons/md";

const List = ({
  todo,
  handleDeleteTodo,
  handleToggleCompleted,
  setFilter,
  filter,
}) => {
  return (
    <>
      <div className="todo__item">
        <div className="todo__filter">
          <span>List:</span>
          <select
            id="filter"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="done">Done</option>
          </select>
        </div>
        <ul>
          {todo.map((item) => (
            <li key={item.id}>
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => handleToggleCompleted(item.id)}
              >
                {item.id} {item.text}
              </span>
              <button onClick={() => handleDeleteTodo(item.id)}>
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default List;
