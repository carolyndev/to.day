import React from 'react';
import Item from '../components/Item';

const List = (props) => {
  const { todos, setTodos, filteredTodos } = props;
  return (
    <>
      <ul className="todo__list">
        {filteredTodos.map((todo) => (
          <Item
            key={todo.id}
            id={todo.id}
            text={todo.text}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </ul>
    </>
  );
};

export default List;
