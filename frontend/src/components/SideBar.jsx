import React, { useState } from "react";
import NavLink from "./NavLink";
import Person2 from "../assets/person2.svg";
import Home from "../assets/home.svg";
import History from "../assets/history.svg";
import Logout from "../assets/logout.svg";
import { logout } from "../hooks/authentication/logout";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import PopUp from "./PopUp.jsx";
import tanda_seru from "../assets/tanda_seru.svg"

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false)
  const { out } = logout();

  return (
    <>
      <div>
        <button className="lg:hidden p-4" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
        <div
          className={`fixed inset-y-0 right-0 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform lg:relative lg:translate-x-0 flex flex-col bg-[#3E0000] vm:h-full text-center h-screen text-white justify-between z-50 vm:w-1/2`}
        >
          <div className="flex flex-col justify-end ">
            <button
              className="lg:hidden p-4 flex justify-end"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
            </button>
            <div>
              <h3 className="font-bold text-lg m-8">Admin Panel</h3>
            </div>
            <div className="flex p-6 hover:bg-[#3e0000b6] justify-end hover:cursor-pointer">
              <NavLink
                href={"/dashboard"}
                children={"Dashboard"}
                childimg={Home}
                reverse={true}
              />
            </div>
            <div className="flex p-5 hover:bg-[#3e0000b6] justify-end hover:cursor-pointer">
              <NavLink
                href={"/dashboard/admin"}
                children={"Users"}
                childimg={Person2}
                reverse={true}
              />
            </div>
            <div className="flex p-5 hover:bg-[#3e0000b6] justify-end hover:cursor-pointer">
              <NavLink
                href={"/riwayat"}
                children={"Riwayat"}
                childimg={History}
                reverse={true}
              />
            </div>
          </div>
          <div className="flex p-5 justify-end hover:cursor-pointer">
            <button onClick={() => setShowNotif(true)} className="flex items-center gap-5">
              Logout{" "}
              <span>
                <img src={Logout} alt="Logout" className="w-8" />
              </span>
            </button>
          </div>
        </div>
      </div>
      {
      showNotif &&
      <PopUp logout={true} icon={tanda_seru} Confirmation={true} text={"Apakah Anda Yakin Ingin Keluar?"} close={() => {setShowNotif(false)}} callback={out}/>
    }
    </>
  );
};

export default SideBar;
