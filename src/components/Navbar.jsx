/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({ setToken }) => {

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <Link to="/">
        <img className="w-[max(10%,80px)]" src={assets.logo} alt="logo" />
      </Link>
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
