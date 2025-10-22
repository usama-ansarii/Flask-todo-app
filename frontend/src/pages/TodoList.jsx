import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { APiRequest } from "../services/ApiRequest";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  const getAllTodos = async () => {
    try {
      const res = await APiRequest.getTodo();
      const data = res?.data;
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await APiRequest.deleteTodo(id);
      console.log(res.data);
      getAllTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };


  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="todo-list">
      <div className="card">
        <h2 className="card__title">Your Todos</h2>

        {todos.length === 0 ? (
          <p className="no-todo">No todos yet.</p>
        ) : (
          <div className="todo-table">
            {todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                <div className="todo-text">
                  <h4>{todo.task}</h4>
                  <p>{todo.description}</p>
                </div>
                <div className="todo-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit/${todo._id}`)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
