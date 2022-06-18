import axios from "axios";
const API_URL = "http://localhost:8080/";
const answered = () => {
  return axios.get("http://localhost:8080/answered");
};
const view = () => {
  return axios.get("http://localhost:8080/view");
};

const date = () => {
  return axios.get("http://localhost:8080/dates");
};
const QuestionService = {
  answered,
  view,
  date,
};
export default QuestionService;
