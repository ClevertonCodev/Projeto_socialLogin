import { Navigate, Outlet } from "react-router-dom";
import Authorization from "../../components/token/auth";

function PrivateRoute(   ){
  let isLogged = false
  if(Authorization()){
    isLogged = true

  }
  return isLogged ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;