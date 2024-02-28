import React, { useState } from 'react';
import './editable.scss';
import api from '../../../../Services/api';

const Editable = ({
  text,
  placeholder,
  children,
  task,
  allTasks,
  setAllTasks,
  setUpdatedTask,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  const handleKeyDown = async (event, id) => {
    if (event.key === 'Enter') {
      setEditing(false);

      await api.put(
        'tasks/update/' + id,
        { text },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      setAllTasks(
        allTasks.map((task) =>
          task.ID === id ? { ...task, Text: text } : task
        )
      );
      setUpdatedTask('');
    }
  };

  return (
    <section {...props} className='Editable'>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, task.ID)}
        >
          {children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{text || placeholder || 'Task Name'}</span>
        </div>
      )}
    </section>
  );
};

export default Editable;

