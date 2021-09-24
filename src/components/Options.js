import React, { useState } from 'react';
import { ReactComponent as EllipsisIcon } from '../images/ellipsis.svg';
import { ReactComponent as CheckIcon } from '../images/check.svg';
import { ReactComponent as TrashIcon } from '../images/trash.svg';
import { ReactComponent as XIcon } from '../images/delete.svg';
import { ReactComponent as ResetIcon } from '../images/reset.svg';

const Options = (props) => {
  const { todos, setTodos, defaultTodos, toggleOptions, setToggleOptions } =
    props;

  function toggleOptionsMenu() {
    setToggleOptions(!toggleOptions);
  }
  function deleteAll() {
    setTodos([]);
  }
  function completeAll() {
    setTodos(
      todos.map((item) => {
        return {
          ...item,
          completed: true,
        };
      })
    );
  }
  function incompleteAll() {
    setTodos(
      todos.map((item) => {
        return {
          ...item,
          completed: false,
        };
      })
    );
  }
  function defaultList() {
    setTodos(defaultTodos);
  }

  return (
    <div className="options">
      <button className="options-button" onClick={toggleOptionsMenu}>
        {toggleOptions === false ? <EllipsisIcon /> : <XIcon />}
      </button>
      <div
        className={
          toggleOptions === true ? 'options-menu show-options' : 'options-menu'
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div id="options-title">More Options</div>
        <div className="complete" id="complete" onClick={completeAll}>
          <CheckIcon />
          <button>mark all complete</button>
        </div>

        <div className="incomplete" id="incomplete" onClick={incompleteAll}>
          <XIcon />
          <button>mark all incomplete</button>
        </div>

        <div className="delete" id="delete" onClick={deleteAll}>
          <TrashIcon />
          <button>delete all</button>
        </div>

        <div className="reset" id="reset" onClick={defaultList}>
          <ResetIcon />
          <button>reset</button>
        </div>
      </div>
    </div>
  );
};

export default Options;
