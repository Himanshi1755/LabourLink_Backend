import React from "react";
import { Navigate } from "react-router-dom";

// export const isLoggedIn = ()=>{
//     return !!sessionStorage.getItem("user")
//   }

//   export const getUser = ()=>{
//     let user = sessionStorage.getItem("user");
//     user= JSON.parse(user);return user;

//   }
function Auth({ children, allowedRole }) {
  
  const user = JSON.parse(sessionStorage.getItem("user"));


  if (!user) {
    return <Navigate to="/login" state={{roleRequired : allowedRole}}/>;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default Auth;