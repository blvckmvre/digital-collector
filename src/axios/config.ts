import axios from "axios";

const $req = axios.create({
  baseURL: process.env.REACT_APP_URL || "http://localhost:3001",
  withCredentials: true
});

export default $req;