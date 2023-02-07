import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import MainLayout from "./components/Layout";
import useAuth from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";

function App() {
  const isLogin = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate('/login')
  //   }
  // }, [location])

  return (
    <div>
      <Header />
      {isLogin ? <MainLayout/> : <LoginPage />}
      
    </div>
  );
}

export default App;
