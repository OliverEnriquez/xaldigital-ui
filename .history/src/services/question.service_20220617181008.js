import axios from "axios";
const API_URL = "http://localhost:8080/";
const answered = (username, password) => {
  return axios.get("http://localhost:8080/answered");
};
const view = (username, password) => {
  return axios.get("http://localhost:8080/view");
};
const QuestionService = {
  answered,
  view,
};
export default QuestionService;
