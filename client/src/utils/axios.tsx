import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

const token = "Bearer ";

axios.defaults.headers.common["authorization"] = token;
axios.defaults.baseURL = BASE_URL;
export default axios;
