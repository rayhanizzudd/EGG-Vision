import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar.jsx";
import Vector from "../../assets/Vector.png";
import { useLocation, useNavigate } from "react-router-dom";
import { refreshToken } from "../../hooks/authentication/refreshToken.js";
import { useTokenValidation } from "../../hooks/authentication/useTokenValidation.js";
import BoxInformation from "../../components/BoxInformation.jsx";

// IMAGE
import fertile from "../../assets/fertile.png";
import nonFertile from "../../assets/nonFertile.png";

export default function ResultAnalis() {
  const { tokenData, username, exp, role } = refreshToken();
  useTokenValidation(tokenData, exp, role, "pegawai");
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("useEffect called");
    if (!location.state || !location.state.data) {
      navigate(-1); // Navigate back to the previous page
    } else {
      setData(location.state.data);
    }
  }, []);

  if (!data) {
    return null; // Render nothing or a fallback UI
  }

  console.log("hasilnya", data);

  return (
    <>
      <div className=" flex justify-center">
      <div className="container flex flex-col px-16 ">
        <Navbar users={username} />
        <div className="flex justify-center font-bold text-5xl mt-12 vm:items-center vm:mt-5 md:px-14 text-[#3E0000]">
          <h1>Hasil Analisis</h1>
        </div>
        <div className="flex justify-between gap-10 mt-10 vm:flex-col vm:gap-5">
          <img
            className="w-[400px] bg-cover object-contain basis-1/2"
            src={`http://localhost:5000/${data.original_image}`}
            alt=""
          />
          <img
            className="w-[400px] bg-cover object-contain basis-1/2"
            src={`http://localhost:5000/${data.output_image}`}
            alt=""
          />
        </div>
        <div className="flex justify-center mt-10">
          <table className="font-bold">
            <tbody>
              <tr>
                <td>Ukuran : </td>
                <td>
                  {data.egg_info[0].predicted_length.toFixed(2)} Cm
                  x {data.egg_info[0].predicted_width.toFixed(2)} Cm
                </td>
              </tr>
              <tr>
                <td>Kondisi : </td>
                <td>{data.egg_info[0].class}</td>
              </tr>
              <tr>
                <td>Grade : </td>
                <td>{data.egg_info[0].grade}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center font-bold text-5xl mt-12 vm:items-center vm:mt-5 md:px-14 text-[#3E0000]">
          <h1>KETERANGAN </h1>
        </div>
        <div className="flex vm:flex-col gap-4 mt-5 justify-between ">
          <BoxInformation
            grade={"A"}
            panjang={"> 6 CM"}
            lebar={"> 4.7 CM"}
            kondisi={"Non Fertile"}
          />
          <BoxInformation
            grade={"B"}
            panjang={"< 6 CM"}
            lebar={"< 4.7 CM"}
            kondisi={"Non Fertile"}
          />
          <BoxInformation
            grade={"C"}
            panjang={"bebas"}
            lebar={"bebas"}
            kondisi={"Fertile"}
          />
        </div>

        <div className="mb-10 mt-10 vm:mt-5 flex vm:flex-col">
          <div className="flex items-center gap-5 font-bold text-base text-[#3E0000]">
            <img src={nonFertile} alt="fertile" />
            <p>
              Non Fertil adalah kondisi telur yang tidak dibuahi oleh pejantan
            </p>
          </div>
          <div className="flex items-center gap-5 font-bold text-base text-[#3E0000] vm:mt-5 flex-row-reverse vm:flex-row vm:text-start text-end">
            <img src={fertile} alt="fertile" />
            <p>
              Fertil adalah kondisi telur yang dibuahi oleh pejantan dan
              berpotensi untuk menetas
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
