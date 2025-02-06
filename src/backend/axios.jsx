import axios from "axios";
import { Cookies } from "react-cookie";

let cookie = new Cookies();
const token = cookie.get("atk");

export default axios.create({
  baseURL: "http://localhost/nud_bark/src/backend/api",
  headers: { Authorization: `Bearer ${token}` },
});
