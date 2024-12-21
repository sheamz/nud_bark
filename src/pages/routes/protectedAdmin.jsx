import { Navigate, Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

function ProtectedAdmin() {
  const atk = cookie.get("atk");

  return cookie.get("atk") ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedAdmin;
