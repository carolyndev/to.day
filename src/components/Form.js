import React from 'react';
import { ReactComponent as PlusIcon } from '../images/plus.svg';

const Form = (props) => {
  const { inputText, setInputText, todos, setTodos, setStatus } = props;
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleInputClick = (e) => {
    e.preventDefault();
    console.log('clicked submit button');
    if (inputText) {
      setTodos([
        ...todos,
        {
          text: inputText,
          completed: false,
          id: Math.floor(Math.random() * 10000),
          edit: false,
        },
      ]);
      setInputText('');
    } else {
      alert('You need to enter a task');
    }
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    console.log('filter by: ' + e.target.value);
  };

  return (
    <>
      <form className="todo__form">
        <div className="todo__input">
          <input
            value={inputText}
            type="text"
            className="text"
            placeholder="Add new task"
            onChange={handleInputChange}
            // autoFocus
          />
          <button className="button" type="submit" onClick={handleInputClick}>
            <PlusIcon />
          </button>
        </div>

        <div className="todo__select">
          <select name="todos" id="filter-todo" onChange={handleStatus}>
            <option value="all">Filter by:</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </form>
    </>
  );
};

export default Form;
