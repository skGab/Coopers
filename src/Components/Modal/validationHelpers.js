// src/components/Modal/validationHelpers.js
export const handleValidationError = (err, setUserError, setPasswordError) => {
  const userMessage = err.message.includes('user') ? err.message : null;
  const passwordMessage = err.message.includes('password') ? err.message : null;
  setUserError(userMessage);
  setPasswordError(passwordMessage);
};
