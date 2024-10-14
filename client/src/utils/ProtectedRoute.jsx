import React from "react";
import { Outlet } from "react-router-dom";

function ProtectedRoute({ role }) {
  // console.log(role);
  // return <>{role === "Admin" ? <Outlet /> : null}</>;
  return <Outlet/>
}

export default ProtectedRoute;
