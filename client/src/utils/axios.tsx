import axios from "axios";
const BASE_URL = `${process.env.API_URL}`;

const token = "Bearer ";

axios.defaults.headers.common["authorization"] = token;
axios.defaults.baseURL = BASE_URL;
export default axios;
