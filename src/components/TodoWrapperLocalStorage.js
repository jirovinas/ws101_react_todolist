import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  const addTodo = (newTodo) => {
    const todoWithId = {
      id: uuidv4(),
      task: newTodo.task,
      date: newTodo.date,
      time: newTodo.time, // Include time
      completed: false,
      isEditing: false,
    };
    const newTodos = [...todos, todoWithId];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));

    // Check if all tasks for the date are completed
    const dateToCheck = newTodos.find(todo => todo.id === id).date;
    const allCompleted = newTodos.every(todo => todo.date === dateToCheck && todo.completed);
    
    if (allCompleted) {
      const updatedTodos = newTodos.map(todo => {
        if (todo.date === dateToCheck) {
          return { ...todo, date: 'All tasks completed!' }; // Change the date when all tasks are done
        }
        return todo;
      });

      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id, newDate, newTime) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, task, date: newDate, time: newTime, isEditing: !todo.isEditing } // Update task, date, and time
        : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div className='TodoWrapper'>
      <h1>To Do List!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={index} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
