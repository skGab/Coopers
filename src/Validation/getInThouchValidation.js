import * as yup from "yup";

const phoneRegEx =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const getInThouch = yup.object().shape({
  message: yup.string().required("The message field cannot be empty"),
  telephone: yup.string().matches(phoneRegEx, "telephone number is not valid"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("The email field cannot be empty"),
});

export default getInThouch;
