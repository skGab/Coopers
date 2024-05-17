// src/components/Modal/Modal.js
import './modal.scss';
import { motion, AnimatePresence } from 'framer-motion';
import modalImg from '/img/sign-in-img.png';
import { useState, useEffect } from 'react';
import { getUsers } from './apiHelpers';
import { handleValidationError } from './validationHelpers';
import { createUser, storeUserInLocalStorage } from './apiHelpers';
import userSchema from '../../Validation/modalValidation';
import { userContext } from '../../Store/userContext';
import { useContext } from 'react';
import { handleSignIn, handleSignUp } from './modalHandlers';

const Modal = ({ showModal, setShowModal, name, setErrorMessage }) => {
  const [passwordError, setPasswordError] = useState(null);
  const [userError, setUserError] = useState(null);
  const [usersInfo, setUsersInfo] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  const { setAuthentication, setUser, setAllTasks } = useContext(userContext);

  useEffect(async () => {
    if (showModal) {
      const error = await getUsers(setUsersInfo);

      if (error != null) {
        if (error.response.status == 500) {
          setFetchError(true);
        }
      }
     
    }
  }, [showModal]);

  // HANDLE MODAL FOR SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    try {
      const isValid = await userSchema.validate(formData);

      if (name === 'sign-up') {
        handleSignUp(
          isValid,
          usersInfo,
          setUserError,
          createUser,
          resetErrorStatesAndCloseModal
        );
      } else if (name === 'sign-in') {
        handleSignIn(
          isValid,
          usersInfo,
          setUserError,
          setPasswordError,
          setAuthentication,
          setUser,
          storeUserInLocalStorage,
          resetErrorStatesAndCloseModal,
          setAllTasks
        );
      }
    } catch (err) {
      handleValidationError(err, setUserError, setPasswordError);
    }
  };

  const resetErrorStatesAndCloseModal = () => {
    setUserError(null);
    setPasswordError(null);
    setShowModal(false);
    setErrorMessage(null);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <div className='modal__container'>
          {/* Dark Background */}
          <motion.div
            className='backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          {/*  Modal */}
          <motion.div
            className='modal'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img src={modalImg} alt='Sign in Image' />

            {/* Close Button */}
            <div
              onClick={() => {
                setShowModal(false);
                setUserError(null);
                setPasswordError(null);
              }}
              className='modal__close'
            >
              Close
            </div>
            {/* Modal Header */}
            <div className='modal__header'>
              {name === 'sign-in' ? (
                <h1>
                  Sign in <br />
                  <span>to access your list</span>
                </h1>
              ) : (
                <h1>
                  Sign up <br />
                  <span>to access your list</span>
                </h1>
              )}
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className='modal__form'>
              <label>User:</label>
              <input name='user' type='text' />
              {userError && <span className='error'>{userError}</span>}
              <label className='reSize'>Password:</label>
              <input type='password' name='password' />
              {passwordError && <span className='error'>{passwordError}</span>}

              {fetchError ? (
                <button disabled>Under maintenance</button>
              ) : (
                <button>{name === 'sign-in' ? 'Sign in' : 'Sign up'}</button>
              )}
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
