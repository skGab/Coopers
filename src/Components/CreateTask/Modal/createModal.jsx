import { useState, useContext } from 'react';
import { userContext } from '../../../Store/userContext';
import { motion, AnimatePresence } from 'framer-motion';
import './createModal.scss';
import api from '../../../Services/api';

const CreateModal = ({ setShowModal }) => {
  const [newTask, setNewTask] = useState();
  const { allTasks, setAllTasks, user } = useContext(userContext);

  // Storing the newTask data
  const sendTask = async () => {
    const headers = {
      'Content-type': 'application/json',
      accept: 'application/json',
    };

    const body = {
      text: newTask,
    };

    const data = await api.post('/tasks/create/' + user.ID, body, { headers });

    setAllTasks([...allTasks, data.data]);

    setShowModal(false);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <div className='modalTask__container'>
        {/* Dark Background */}
        <motion.div
          className='backdrop'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></motion.div>

        {/*  Modal */}
        <motion.div
          className='modalTask'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close Button */}
          <div onClick={() => setShowModal(false)} className='modalTask__close'>
            X
          </div>

          {/* New Task fild */}
          <div className='modalTask__newTask'>
            <input
              placeholder='Write your task here'
              name='NewTask'
              onChange={(e) => setNewTask(e.target.value)}
              type='text'
            />
            <div onClick={sendTask} className='modalTask__button'></div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateModal;

