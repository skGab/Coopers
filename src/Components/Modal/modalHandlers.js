
export const handleSignUp = async (
  isValid,
  userInfo,
  setUserError,
  registerUser,
  resetErrorStatesAndCloseModal
) => {
  const userExists = userInfo.some((user) => isValid.User === user.User);
  if (userExists) {
    setUserError('This user is already being used');
  } else {
    await registerUser(isValid);
    resetErrorStatesAndCloseModal();
  }
};

export const handleSignIn = async (
  isValid,
  userInfo,
  setUserError,
  setPasswordError,
  setAuthentication,
  setUser,
  storeUserInLocalStorage,
  resetErrorStatesAndCloseModal,
  setAllTasks

) => {
  const matchedUser = userInfo.find(
    (user) => isValid.user === user.User && isValid.password === user.Password
  );

  if (matchedUser) {
    setAllTasks(matchedUser.Tasks)
    setAuthentication(true);
    setUser(matchedUser);
    storeUserInLocalStorage(matchedUser);
    resetErrorStatesAndCloseModal();
  } else {
    setUserError('Invalid email or password');
    setPasswordError('Invalid email or password');
  }
};



