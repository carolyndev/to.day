import Item from '../components/Item';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const List = (props) => {
  const { status, todos, setTodos, filteredTodos, setFilteredTodos } = props;

  function handleDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(filteredTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFilteredTodos(items);

    if (status === 'all') {
      setTodos(items);
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppableList">
          {(provided) => (
            <ul
              className="todo__list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTodos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Item
                        id={todo.id}
                        text={todo.text}
                        todo={todo}
                        todos={todos}
                        setTodos={setTodos}
                      />
                    </li>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default List;
