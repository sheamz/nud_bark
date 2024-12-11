import axios from "axios";
export default axios.create({
  baseURL: "http://localhost/nud_bark/src/backend/api",
  //   headers: { Authorization: "Bearer {token}" },
});
