import axios from "axios";
const API_URL = "http://localhost:8080/";
const answered = (username, password) => {
  return axios.get("http://localhost:8080/answered");
};
const QuestionService = {
  answered,
};
export default QuestionService;
