/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Login from "../components/Login";
import { ToastContainer } from 'react-toastify';
import { TokenContext } from "../context/TokenContext"

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "VNĐ"

const LayoutDefault = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <TokenContext.Provider value={{token}}>
      <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr className="text-gray-300" />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Outlet/>
            </div>
          </div>
        </>
      )}
    </div>
    </TokenContext.Provider>
  );
};

export default LayoutDefault;
