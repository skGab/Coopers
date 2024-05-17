import api from "../../Services/api";

// CREATE USER
export const createUser = async (isValid) => {
  const headers = {
    "Content-type": "application/json",
    accept: "application/json",
  };
  const body = JSON.stringify(isValid);
  await api.post("/users/create", body, { headers });
};

// GET USERS
export const getUsers = async (setUsersInfo) => {
  try {
    const data = await api.get('/users');
    setUsersInfo(data.data);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return error
  }
};

// // GET TASKS
// export const getTasks = async (currentUser, setAllTasks) => {
//   try {
//     const data = await api.get("/tasks/" + currentUser.ID);

//     if (data == {}) return setAllTasks([])

//     setAllTasks(data.data);
//   } catch (err) {
//     console.error("Error fetching tasks:", err);
//   }
// };

// STORE USER ON LOCAL STORAGE
export const storeUserInLocalStorage = (currentUser) => {
  localStorage.setItem("user", JSON.stringify(currentUser));
};
