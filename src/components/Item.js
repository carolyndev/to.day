import React, { useState } from 'react';
import { ReactComponent as CheckIcon } from '../images/check.svg';
import { ReactComponent as TrashIcon } from '../images/trash.svg';

const Item = ({ edit, text, todo, todos, setTodos }) => {
  const [userChanges, setUserChanges] = useState(text);

  const handleDoubleClick = (e) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            edit: !edit,
          };
        }
        return item;
      })
    );
  };

  const saveTask = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setTodos(
        todos.map((item) => {
          if (item.id === todo.id) {
            return {
              ...item,
              text: userChanges,
              edit: false,
            };
          }
          return item;
        })
      );
    }
  };

  const handleChange = (e) => {
    setUserChanges(e.target.value);
  };

  const handleCompleteClick = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  const handleDeleteClick = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  function handleBlur() {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            text: userChanges,
            edit: false,
          };
        }
        return item;
      })
    );
  }

  return (
    <div className="todo__item" onDoubleClick={handleDoubleClick}>
      {todo.edit === true ? (
        <>
          <input
            value={userChanges}
            placeholder="Edit your task"
            onKeyDown={saveTask}
            onBlur={handleBlur}
            onChange={handleChange}
            autoFocus
          />

          <div className="item-button">
            <button
              className="button complete-btn"
              onClick={handleCompleteClick}
            >
              <CheckIcon />
            </button>
            <button className="button trash-btn" onClick={handleDeleteClick}>
              <TrashIcon />
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={`${todo.completed ? 'completed' : ''}`}>{text}</p>

          <div className="item-button">
            <button
              className="button complete-btn"
              onClick={handleCompleteClick}
            >
              <CheckIcon />
            </button>

            <button className="button trash-btn" onClick={handleDeleteClick}>
              <TrashIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
