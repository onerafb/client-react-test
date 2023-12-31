import React from "react";
import "../styles/todo.css";
const Todoitems = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id
}) => {
  return (
    <div>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>
        <input type="checkbox" checked={isCompleted} onChange={()=>updateHandler(id)} />
        <button onClick={()=>deleteHandler(id)} className="todo-bt">Delete</button>
      </div>
    </div>
  );
};

export default Todoitems;
