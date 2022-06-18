import axios from "axios";

const API_URL = "http://localhost:8080/";

const awnsers = () => {
  return axios.get("http://localhost:8080/product/");
};

const QuestionsService = {
  awnsers,
};
export default QuestionsService;
