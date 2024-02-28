import success from '/icons/icon_success.png';
import success2 from '/icons/icon_success2.png';
import { useState, useContext } from 'react';
import Editable from '../Editable/editable';
import { userContext } from '../../../../Store/userContext';
import { Draggable } from 'react-beautiful-dnd';
import api from '../../../../Services/api';

const Taks = ({ task, name, index }) => {
  // Tasks Context
  const { allTasks, setAllTasks } = useContext(userContext);

  const [updatedTask, setUpdatedTask] = useState('');

  // Completing Task
  const completeTasks = async (id, complete) => {
    await api.put('/tasks/state/' + id, { complete });

    setAllTasks(
      allTasks.map((t) => {
        if (t.ID == id) {
          return { ...t, Complete: !t.Complete };
        }

        return t;
      })
    );
  };

  // Delete Task
  const deleteTask = async (id) => {
    await api.delete('tasks/delete/' + id).then((res) => res.data);

    setAllTasks((task) => task.filter((task) => !task.ID));
  };

  const checkBoxType = () => {
    // Type of checkBox
    if (name == 'Done') {
      return <img src={success2} alt='Sucess Icon' loading='lazy' />;
    } else {
      return <img src={success} alt='Sucess Icon' loading='lazy' />;
    }
  };

  return (
    <Draggable
      droppableId='my-todo-list'
      draggableId={task.ID}
      key={task.ID}
      index={index}
    >
      {(provided) => (
        <li
          className='card__tasks'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='flexAdjust'>
            {/* CheckBox */}
            <div
              onClick={() => completeTasks(task.ID, task.Complete)}
              className={`card__checkBox ${
                name == 'Done' ? 'greenBorder' : ''
              } ${task.Complete && 'greyBorder'}`}
            >
              {task.Complete && checkBoxType()}
            </div>

            {/* Task Name */}
            <div className={`card__task ${task.Complete && 'activeTitle'}`}>
              <Editable
                text={updatedTask}
                placeholder={task.Text}
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                task={task}
                type='input'
                setUpdatedTask={setUpdatedTask}
              >
                <input
                  type='text'
                  name='task'
                  placeholder='One more click to edit'
                  onChange={(e) => setUpdatedTask(e.target.value)}
                />
              </Editable>
            </div>
          </div>

          {/* Delete */}
          <div onClick={() => deleteTask(task.ID)} className='card__delete'>
            delete
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Taks;

