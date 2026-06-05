import axios from "axios";

const API = axios.create({
  baseURL: "https://hand-written-digit-recognition-xrc2.onrender.com"
});

export default API;