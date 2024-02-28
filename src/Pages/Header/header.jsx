import './header.scss';
import logo from '/img/Logo.png';
import sala from '/img/02.png';
import arrow from '/icons/icon-scroll.png';
import Modal from '../../Components/Modal/modal';
import { useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../../Store/userContext';

const Header = () => {
  // Turn page State
  const {
    setOnPage,
    setAuthentication,
    authentication,
    user,
    setUser,
    setAllTasks,
  } = useContext(userContext);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState('');

  // Error State
  const [errorMessage, setErrorMessage] = useState(false);

  // Go to todo list Button
  const pageCall = () => {
    if (authentication) {
      setOnPage(true);
    }

    if (authentication == false) {
      setErrorMessage(true);
    }
  };

  // Sign out from the page
  const handleSignOut = () => {
    setAuthentication(false);
    setUser({});
    localStorage.clear();
    setAllTasks([]);
  };

  return (
    <div className='main__grid'>
      <header className='header__container'>
        {/* Nav */}
        <nav className='header__nav'>
          <img src={logo} alt='Logo Coopers' />

          {authentication ? (
            <div className='loggedIN'>
              <h2 className='authentication'>
                Welcome <span>{user.User}</span>
              </h2>

              <button onClick={handleSignOut}>Sign out</button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setModalName('sign-up');
                  setShowModal(true);
                }}
              >
                Sign up
              </button>
              <button
                onClick={() => {
                  setModalName('sign-in');
                  setShowModal(true);
                }}
              >
                Login
              </button>
            </div>
          )}
        </nav>

        {/* Modal */}
        {modalName == 'sign-in' ? (
          <Modal
            name={'sign-in'}
            showModal={showModal}
            setShowModal={setShowModal}
            setErrorMessage={setErrorMessage}
          />
        ) : (
          <Modal
            name={'sign-up'}
            showModal={showModal}
            setShowModal={setShowModal}
            setErrorMessage={setErrorMessage}
          />
        )}

        {/* First Block */}
        <div className='header__flex'>
          <div className='header__title'>
            <div>
              <h1>Organize</h1>
              <p className='dayle'>your daily jobs</p>

              <p className='margin'>The only way to get things done</p>
            </div>

            <button onClick={pageCall}>Go to To-do list</button>
            {errorMessage && (
              <span className='errorMessage'>You must be logged in</span>
            )}
          </div>

          {/* Second Block */}
          <div className='header__sala'>
            <img src={sala} alt='Imagem Sala' />
          </div>
        </div>

        <div className='center'>
          <img className='arrowIcon' src={arrow} alt='Arrow Icon' />
        </div>
      </header>
    </div>
  );
};

export default Header;

