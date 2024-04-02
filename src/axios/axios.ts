import Axios from "axios";

const API_BASE_URL: string = import.meta.env.BASE_URL;
const axios = Axios.create({
  baseURL: API_BASE_URL,
});

export default axios;
