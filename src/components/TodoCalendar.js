import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TodoCalendar.css';

const TodoCalendar = ({ date, setDate, todos }) => {
  const getTodosForDate = (selectedDate) => {
    return todos.filter(todo => todo.date === selectedDate.toLocaleDateString());
  };

  return (
    <div className="TodoCalendar">
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date }) => {
          const tasksForDate = getTodosForDate(date);
          return tasksForDate.length > 0 ? 'marked' : null; // Mark dates with tasks
        }}
      />
    </div>
  );
};

export default TodoCalendar;
