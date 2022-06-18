import axios from "axios";
const API_URL = "http://localhost:8080/";
const aerolinea = () => {
  return axios.get("http://localhost:8080/aerolinea");
};
const aeropuerto = () => {
  return axios.get("http://localhost:8080/aeropuerto");
};

const dia = () => {
  return axios.get("http://localhost:8080/dia");
};
const moreThree = () => {
  return axios.get("http://localhost:8080/more/three");
};
const FlightsService = {
  aerolinea,
  aeropuerto,
  dia,
  moreThree,
};
export default FlightsService;
