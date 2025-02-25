import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"

const LayoutDefault = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <>
        <Navbar />
        <hr className="text-gray-300" />
        <div className="flex w-full">
          <Sidebar />
          <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
          <Outlet />
          </div>
        </div>
      </>
    </div>
  )
}

export default LayoutDefault