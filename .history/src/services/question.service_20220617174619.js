import axios from "axios";
const API_URL = "http://localhost:8080/";
const register = (username, password) => {
  return axios.post(API_URL + "create", {
    username,
    password,
  });
};
const login = (username, password) => {
  return axios
    .post(API_URL + "authenticate", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const QuestionService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default QuestionService;