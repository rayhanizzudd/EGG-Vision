import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    function toSignIn(){
        navigate('/login'); 
    }

    return (
        <div className='h-screen px-16 py-4'>
            <div className='flex bg-transparent justify-end items-center text-[#3E0000]'>
                <button onClick={toSignIn} className="px-9 py-2 border-[#3E0000] border-2 rounded-xl hover:text-white hover:bg-[#3E0000]">Sign In</button>
            </div>
            <div className="flex justify-center flex-col h-full text-[#3E0000] vm:items-start">
                <h1 className="text-8xl font-extrabold md:text-7xl sm:text-6xl vm:text-4xl">EGG VISION</h1>
                <p className="text-2xl mt-4 vm:text-xl">we make a technology to simplify and speed up egg quality control</p>
            </div>
        </div>
    );
}

export default LandingPage;
