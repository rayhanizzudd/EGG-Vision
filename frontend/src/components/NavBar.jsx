import React, { useState } from "react";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import Person from "../assets/person.svg";
import { refreshToken } from "../hooks/authentication/refreshToken";
import { useTokenValidation } from "../hooks/authentication/useTokenValidation";
import { logout } from "../hooks/authentication/logout.js";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import clsx from 'clsx';
import PopUp from "./PopUp.jsx";
import tanda_seru from "../assets/tanda_seru.svg"

export default function Navbar({ users }) {
  const { out } = logout();
  const { tokenData, exp } = refreshToken();
  const [showNotif, setShowNotif] = useState(false)
  useTokenValidation(tokenData, exp);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className="bg-transparent text-[#3E0000] z-20">
      <div className="flex justify-between items-center p-4 vm:p-5 relative">
        <Link to={"/home"}>
          <h3 className="font-bold text-xl">EGG VISION</h3>
        </Link>
        <div className={clsx('md:hidden z-10', {'text-white' : isOpen})}>
          <button onClick={toggleMenu}>
            {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
        <div className="hidden md:flex gap-5">
          <NavLink children={"Analisis"} href={"/analytic"} />
          <NavLink children={"Riwayat"} href={"/user-riwayat"} />
          <NavLink children={"Kalibrasi"} href={"/kalibrasi"} />
        </div>
        <div className="hidden md:flex items-center font-medium gap-4">
          <div className="flex items-center gap-3 text-base">
            <p>{users}</p>
            <img className="w-10" src={Person} alt="icon" />
          </div>
          <button
            onClick={() => setShowNotif(true)}
            className="px-9 py-2 border-[#3E0000] border-2 rounded-xl hover:text-white hover:bg-[#3E0000]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    <div className={clsx('md:hidden vm:m-0 fixed h-screen flex right-0 mr-3 z-10 flex-col items-end gap-10 bg-[#3E0000] w-1/2 pt-16 px-5 text-white transition-transform transform', {
      'translate-x-full': !isOpen,
      'translate-x-0': isOpen,
    })}>
      <div className="flex items-center gap-3 text-base">
        <p>{users}</p>
        <img className="w-10" src={Person} alt="icon" />
      </div>
      <NavLink children={'Analisis'} href={'/analytic'} />
      <NavLink children={'Riwayat'} href={'/user-riwayat'} />
      <NavLink children={"Kalibrasi"} href={"/kalibrasi"} />
      <div className="flex items-center font-medium gap-4 flex-col">
        <button onClick={() => {(setShowNotif(true))}} className="border-[#3E0000] border-2 rounded-xl hover:text-white hover:bg-[#3E0000]">
          Logout
        </button>
      </div>
    </div>
    {
      showNotif &&
      <PopUp logout={true} icon={tanda_seru} Confirmation={true} text={"Apakah Anda Yakin Ingin Keluar?"} close={() => {setShowNotif(false)}} callback={out}/>
    }
    </>
  );
}
