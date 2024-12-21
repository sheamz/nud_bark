import { Navigate, Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

function Protected() {
  return cookie.get("atk") ? <Outlet /> : <Navigate to={"/"} />;
}

export default Protected;
