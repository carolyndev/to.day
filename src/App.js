import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import Options from './components/Options';

const defaultTodos = [
  {
    text: "hello, welcome to Today's Todos!",
    completed: false,
    id: 1,
    edit: false,
  },
  {
    text: 'tips and tricks:',
    completed: false,
    id: 2,
    edit: false,
  },
  {
    text: '- hover to see all options',
    completed: false,
    id: 3,
    edit: false,
  },
  {
    text: '- double-click to edit',
    completed: false,
    id: 4,
    edit: false,
  },
  {
    text: '- drag and drop items to reorder your list',
    completed: false,
    id: 5,
    edit: false,
  },
];

const App = () => {
  // states
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState(defaultTodos);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [defaultTheme, setDefaultTheme] = useState(true);
  const [toggleOptions, setToggleOptions] = useState(false);

  // effects
  // [] instructs to run once when app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

  // will run again with todos or status changes when app starts
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

  function closeOptionsMenu() {
    if (toggleOptions === true) {
      setToggleOptions(false);
    }
  }

  return (
    <div className="container" onClick={closeOptionsMenu}>
      <div className="card">
        <Form
          defaultTheme={defaultTheme}
          setDefaultTheme={setDefaultTheme}
          inputText={inputText}
          todos={todos}
          setInputText={setInputText}
          setTodos={setTodos}
          setStatus={setStatus}
        />
        <List
          status={status}
          edit={edit}
          filteredTodos={filteredTodos}
          setFilteredTodos={setFilteredTodos}
          todos={todos}
          setEdit={setEdit}
          setTodos={setTodos}
        />
        <Options
          todos={todos}
          setTodos={setTodos}
          defaultTodos={defaultTodos}
          toggleOptions={toggleOptions}
          setToggleOptions={setToggleOptions}
        />
      </div>
    </div>
  );
};

export default App;
