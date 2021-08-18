import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';

const App = () => {
  // states
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [edit, setEdit] = useState(false);

  // effects
  // run once when app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  // functions
  const filterHandler = () => {
    switch (status) {
      case 'complete':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'incomplete':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  // save to local data
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // get local data
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todosLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todosLocal);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="title">
          <h1 className="title__name">My To-Do List</h1>
          <button className="theme-toggle"></button>
        </div>

        <Form
          inputText={inputText}
          todos={todos}
          setInputText={setInputText}
          setTodos={setTodos}
          setStatus={setStatus}
        />

        <List
          edit={edit}
          filteredTodos={filteredTodos}
          setFilteredTodos={setFilteredTodos}
          todos={todos}
          setEdit={setEdit}
          setTodos={setTodos}
        />
      </div>
    </div>
  );
};

export default App;
