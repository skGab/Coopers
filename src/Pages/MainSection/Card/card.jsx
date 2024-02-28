import './card.scss';
import Button from '../../../Components/Button/button';
import Tasks from './Tasks/tasks';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

const Cards = ({ name, doneTasks, todoTasks }) => {
  return (
    // Container
    <div className='card__container'>
      <div
        className={`card__colorDetail ${name == 'Done' ? 'green' : ''}`}
      ></div>

      {/* Header */}
      <h3>{name}</h3>
      <p className={name == 'Done' ? 'newP' : ''}>
        {name == 'Done' ? (
          <>
            {doneTasks.length > 0 && 'Congratulions!'} <br />
            <span>You have done {doneTasks.length} tasks</span>
          </>
        ) : (
          'Take a breath. Start doing.'
        )}
      </p>

      {/* Tasks */}
      <DragDropContext>
        <Droppable droppableId='tasks'>
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {name == 'Done'
                ? doneTasks.map((task, index) => (
                    <Tasks
                      key={task.ID}
                      index={index}
                      name={name}
                      task={task}
                    />
                  ))
                : todoTasks.map((task, index) => (
                    <Tasks
                      key={task.ID}
                      index={index}
                      name={name}
                      task={task}
                    />
                  ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <Button name={name} />
    </div>
  );
};

export default Cards;

