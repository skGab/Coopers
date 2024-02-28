import './button.scss';
import { useContext } from 'react';
import { userContext } from '../../Store/userContext';
import api from '../../Services/api';

const Button = ({ name }) => {
  const { allTasks, setAllTasks, user, authentication } =
    useContext(userContext);

  const eraseAll = async () => {
    if (authentication) {
      if (name === 'Done') {
        await api.delete('/tasks/deleteAllDone/' + user.ID);
      }

      if (name === 'To-do') {
        await api.delete('/tasks/deleteAllTodo/' + user.ID);
      }
    }

    setAllTasks(
      allTasks.filter((task) => {
        if (name == 'Done') {
          return !task.Complete;
        } else {
          return task.Complete;
        }
      })
    );
  };

  return (
    <button onClick={eraseAll} className='button__container'>
      erase all
    </button>
  );
};

export default Button;

