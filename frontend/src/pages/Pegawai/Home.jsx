import React, { useEffect } from "react";
import Navbar from "../../components/NavBar.jsx";
import { Link, useNavigate } from "react-router-dom";
import Camera from "../../assets/camera.svg";
import Vector from "../../assets/Vector.png"
import {refreshToken} from "../../hooks/authentication/refreshToken.js";
import {useTokenValidation} from "../../hooks/authentication/useTokenValidation.js";


export default function Home() {
    const {tokenData, username, exp, role} = refreshToken()
    useTokenValidation(tokenData, username, role, 'pegawai');
    const navigate = useNavigate();
    return (
        <>
        <div className="flex flex-col h-screen px-16 py-4 overflow-hidden vm:px-5 md:px-14 vm:p-0">
        <Navbar users={username}/>
        <div className="flex items-center min-h-full text-[#3E0000] border-3 vm:px-5">
            <div className="basis-1/2">
                <h1 className="text-8xl font-extrabold vm:text-7xl">Analisis</h1>
                <p className="text-2xl mt-4">Ambil gambar keluar hasil analisisnya</p>
                <Link className="flex items-center gap-2 px-4 py-2 border-2 w-max rounded-2xl border-[#3E0000] bg-[#3E0000] text-white mt-9" to={'/analytic'}>
                    <img className="w-10" src={Camera} alt="" />
                    <h3 className="font-bold text-base">Ambil Gambar</h3>
                </Link>
            </div>
            <div className="basis-1/2 flex justify-center">
            <img className="w-[580px] vm:hidden" src={Vector} alt="" />
            </div>
        </div>
        </div>
        </>
    )
}