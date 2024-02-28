import './todo.scss';
import logo from '/img/Logo.png';
import Cards from '../MainSection/Card/card';
import CreateModal from '../../Components/CreateTask/Modal/createModal';
import { useContext, useState } from 'react';
import { userContext } from '../../Store/userContext';

const Todo = () => {
  const [showModal, setShowModal] = useState(false);

  const { setOnPage, allTasks } = useContext(userContext);

  const doneTasks =
    allTasks.length !== 0 ? allTasks.filter((task) => task.Complete) : [];

  const todoTasks =
    allTasks.length !== 0 ? allTasks.filter((task) => !task.Complete) : [];

  return (
    <div className='todo__container'>
      {/* Nav */}
      <nav className='todo__nav'>
        <img src={logo} alt='Logo Coopers' />

        <button
          onClick={() => {
            setOnPage(false);
          }}
        >
          Home Page
        </button>
      </nav>

      <div className='todo__title'>
        <h1>Welcome</h1>
        <p>to your Todo list</p>
      </div>

      {/* Modal */}
      {showModal && <CreateModal setShowModal={setShowModal} />}

      {/* Todo */}
      <div className='todo__section'>
        <Cards doneTasks={doneTasks} todoTasks={todoTasks} name={'To-do'} />
        <Cards doneTasks={doneTasks} todoTasks={todoTasks} name={'Done'} />
      </div>

      <button
        className='section__createButton'
        onClick={() => setShowModal(true)}
      >
        New Task
      </button>
    </div>
  );
};

export default Todo;

