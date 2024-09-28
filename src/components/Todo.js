import React from 'react';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className={`Todo ${task.completed ? 'completed' : 'incompleted'}`}>
      <div className="task-info">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <span className="task-text">{task.task}</span>
        <span className="task-date">{task.date} at {task.time}</span> {/* Show the time */}
      </div>
      <div className="todo-actions">
        <span className="edit-icon" onClick={() => editTodo(task.id)}>
          <i className="fas fa-edit"></i> {/* FontAwesome edit icon */}
        </span>
        <span className="delete-icon" onClick={() => deleteTodo(task.id)}>
          <i className="fas fa-trash"></i> {/* FontAwesome delete icon */}
        </span>
      </div>
    </div>
  );
};
