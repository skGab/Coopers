import "./form.scss";
import icoEmail from "/icons/icon-mail.png";
import avatar from "/img/image_avatar.png"
import getInThouch from "../../Validation/getInThouchValidation";
import { useState } from "react";

const Form = () => {
  // Error states
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [sentMessage, setSentMessage] = useState(false);

  // Handling with form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Storing inputs data
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    // Form Validation
    try {
      const isValid = await getInThouch.validate(formData);
      setEmailError(null);
      setPhoneError(null);
      setMessageError(null);

      setSentMessage(true);

      // Showing error messages
    } catch (err) {
      if (
        err.message.includes("email") ||
        err.message.includes("telephone") ||
        err.message.includes("message")
      ) {
        if (err.message.includes("email")) {
          setEmailError(err.message);
          setPhoneError(null);
          setMessageError(null);
        }

        if (err.message.includes("telephone")) {
          setPhoneError(err.message);
          setEmailError(null);
          setMessageError(null);
        }

        if (err.message.includes("message")) {
          setMessageError(err.message);
          setPhoneError(null);
          setEmailError(null);
        }
      }
    }
  };

  return (
    <div className="form__container">
      {/* Header */}
      <div className="greenDetail"></div>
      <img
        className="position"
        src={avatar}
        alt="Imagem avatar"
        loading="lazy"
      />

      {/* Icon and Title */}
      <div className="form__getInTouch">
        <img src={icoEmail} alt="Email Icon" loading="lazy" />
        <h3>
          Get in <span>Thouch</span>
        </h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="form__block">
        {/* Name input */}
        <div className="form__name">
          <label>Your name</label>
          <input type="text" placeholder="type your name here" />
        </div>

        {/* Email and Telephone input */}
        <div className="form__emailTelephone">
          {/* Email */}
          <div className="size">
            <label>Email*</label>
            <input name="email" type="text" placeholder="example@example.com" />
            {emailError && <span className="error">{emailError}</span>}
          </div>

          {/* Telephone */}
          <div className="size">
            <label>Telephone*</label>
            <input name="telephone" type="text" placeholder="(  ) ____-____" />
            {phoneError && <span className="error">{phoneError}</span>}
          </div>
        </div>

        {/* Message input */}
        <div className="form__message">
          <label>Message*</label>
          <textarea
            name="message"
            placeholder="Type what you want to say to us"
          />
          {messageError && <span className="error">{messageError}</span>}
        </div>

        {sentMessage ? (
          <span className="sentMessage">Thanks for get in thouch!</span>
        ) : (
          <button>SEND NOW</button>
        )}
      </form>
    </div>
  );
};

export default Form;
