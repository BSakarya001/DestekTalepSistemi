import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  console.log("PROTECTED ROUTE ÇALIŞTI");

  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (!token) {
    console.log("TOKEN YOK → GİRİŞ SAYFASINA");
    return <Navigate to="/" replace />;
  }

  console.log("TOKEN VAR → SAYFAYA İZİN");
  return children;
}

export default ProtectedRoute;