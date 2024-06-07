import React from "react";

const BoxInformation = ({grade, panjang, lebar , kondisi}) => {
  return (
    <>
      <div className="flex justify-start items-center bg-[#3E0000] vm:w-full rounded-2xl sm:flex-col sm:w-52">
        <div className="text-white p-5 w-1/3 flex flex-col items-center border-r-2 sm:w-full sm:border-r-0 sm:border-b-2">
          <h1 className="font-bold ">GRADE</h1>
          <h1 className="font-extrabold text-6xl  text-white">
            {grade}
          </h1>
        </div>
        <div className="text-white w-full">
         <div className="flex justify-center items-center flex-col sm:p-10">
         <p>Ukuran Telur</p>
          <p>Panjang  {panjang}</p>
          <p>Lebar  {lebar}</p>
          <p>{kondisi}</p>
         </div>
        </div>
      </div>
    </>
  );
};

export default BoxInformation;
