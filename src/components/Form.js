import React, { useEffect } from 'react';
import { ReactComponent as PlusIcon } from '../images/plus.svg';

const Form = (props) => {
  const {
    defaultTheme,
    setDefaultTheme,
    inputText,
    setInputText,
    todos,
    setTodos,
    setStatus,
  } = props;

  useEffect(() => {
    getLocalTheme();
  }, []);

  const generateKey = (input) => {
    const inputTime = new Date().getTime();
    return `${input}_${inputTime}`;
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleInputClick = (e) => {
    e.preventDefault();
    console.log('add task');
    if (inputText) {
      setTodos([
        ...todos,
        {
          text: inputText,
          completed: false,
          id: generateKey(inputText),
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

  const handleToggleClick = (e) => {
    setDefaultTheme(!defaultTheme);
    if (defaultTheme === true) {
      saveLocalTheme('dark');
    } else {
      saveLocalTheme('light');
    }
  };

  const saveLocalTheme = (mode) => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  };

  const getLocalTheme = () => {
    let themeLocal = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', themeLocal);
    if (themeLocal === null || themeLocal === 'light') {
      setDefaultTheme(true);
    } else {
      setDefaultTheme(false);
    }
  };

  return (
    <>
      <div className="title">
        <h1 className="title__name">to.day</h1>

        <div
          className={`slider ${
            defaultTheme === false ? 'toggle-on' : 'toggle-off'
          }`}
          id="theme-toggle"
          onClick={handleToggleClick}
        >
          {/* <label htmlFor="theme-btn"></label> */}
          <input type="checkbox" id="theme-checkbox" />
        </div>
      </div>

      <form className="todo__form">
        <div className="todo__input">
          <input
            value={inputText}
            type="text"
            className="input-text"
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
