import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";

function Todo() {
  const [todos, setTodos] = useState([]);
  const apiUrl = "http://localhost:8000/todos"; // Adjust the URL based on your API server's address

  useEffect(() => {
    // Fetch todos when the component mounts
    axios.get(apiUrl)
      .then(response => setTodos(response.data))
      .catch(error => console.error("There was an error fetching the todos", error));
  }, []);

  function addTodo(title) {
    const newTodo = {
      title,
      completed: false
    };
    axios.post(`${apiUrl}/new`, newTodo)
      .then(response => {
        setTodos((currentTodos) => [...currentTodos, response.data]);
      })
      .catch(error => console.error("There was an error adding the todo", error));
  }

  function toggleTodo(id, completed) {
    axios.put(`${apiUrl}/edit/${id}`, { completed })
      .then(() => {
        setTodos((currentTodos) =>
          currentTodos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, completed };
            }
            return todo;
          })
        );
      })
      .catch(error => console.error("There was an error updating the todo", error));
  }

  function deleteTodo(id) {
    axios.delete(`${apiUrl}/delete/${id}`)
      .then(() => {
        setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
      })
      .catch(error => console.error("There was an error deleting the todo", error));
  }

  return (
    <>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}

export default Todo;