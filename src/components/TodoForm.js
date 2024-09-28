import React, { useState } from 'react';

export const TodoForm = ({ addTodo, selectedDate }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
            // Create a todo object with task text and the selected date
            const newTodo = {
                task: value,
                date: selectedDate.toLocaleDateString(), // Use selected date
            };
            addTodo(newTodo);
            setValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="todo-input"
                placeholder="What is the task today?"
            />
            <button type="submit" className="todo-btn">
                Add Task
            </button>
        </form>
    );
};
