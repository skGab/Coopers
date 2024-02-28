import Cards from './Card/card';
import './section.scss';
import graphism from '/img/grafismos.png';

const MainSection = ({ allTasks }) => {
  const doneTasks =
    allTasks.length !== 0 ? allTasks.filter((task) => task.Complete) : [];

  const todoTasks =
    allTasks.length !== 0 ? allTasks.filter((task) => !task.Complete) : [];

  return (
    <section className='section__container'>
      {/* BackGround */}
      <div className='section__bg'>
        <h2 className='section__title'>To-do List</h2>
        <div className='line'></div>
        <p className='section__description'>
          Drag and drop to set your main priorities, check when done and create
          what's new.
        </p>
      </div>

      <img
        className='graphismIMG'
        src={graphism}
        alt='Grafismo'
        loading='lazy'
      />

      {/* Todo Cards  */}
      <div className='section__cards'>
        <Cards doneTasks={doneTasks} todoTasks={todoTasks} name={'To-do'} />
        <Cards doneTasks={doneTasks} todoTasks={todoTasks} name={'Done'} />
      </div>
    </section>
  );
};

export default MainSection;

