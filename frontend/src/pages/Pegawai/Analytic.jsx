import React, { useCallback, useState, useRef, useEffect } from "react";
import Navbar from "../../components/NavBar.jsx";
import Webcam from "react-webcam";
import Vector from "../../assets/Vector.png";
import ButtonCstm from "../../components/ButtonCstm.jsx";
import Camera from "../../assets/camera.svg";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {refreshToken} from "../../hooks/authentication/refreshToken.js";
import {useTokenValidation} from "../../hooks/authentication/useTokenValidation.js";
import api from "../../lib/apiConfig.js"
import { calibration } from "../../hooks/calibration/Calibration.js";
import PopUp from "../../components/PopUp";
import gagal from "../../assets/gagal.svg";
import centang from "../../assets/centang.svg";

export default function Analytic() {
  const {tokenData, username, userId,  exp, role} = refreshToken()
  useTokenValidation(tokenData, username, role, 'pegawai');
  const [isShowVideo, setIsShowVideo] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoElement = useRef(null);
  const navigate = useNavigate();

  const {getCalibration} = calibration()
  const [scaleWidth, setScaleWidth] = useState();
  const [scaleLength, setScaleLength] = useState();

  const [notif, setNotif] = useState(false);
  const [notifMessages, setnotifMessages] = useState();
  const [succes, setSuccess] = useState(false);

  useEffect(() => {
    const getScale = async () => {
    try {
        const res = await getCalibration()
        setScaleLength(res[0].scale_length)
        setScaleWidth(res[0].scale_width)
    } catch (error) {
      console.log("Get Scale Eror", error)
    }
  }

  getScale()
  },[])

  const capture = useCallback(() => {
    const imageSrc = videoElement.current.getScreenshot();
    setCapturedImage(imageSrc);
    console.log(imageSrc)
    console.log("Gambar Di Ambil");
    setIsShowVideo(false);
  }, [videoElement]);

  const retake = useCallback(() => {
    setCapturedImage(null);
    setIsShowVideo(true);
    console.log("Retake Foto");
  }, []);

 const handleNextClick = async () => {
  if (capturedImage) {
    const blob = await fetch(capturedImage).then(res => res.blob());
    const file = new File([blob], 'webcam_capture.jpeg', { type: 'image/jpeg' });
    try {
      const postData = new FormData();
      postData.append('file', file);
      postData.append('scale_width', scaleWidth);
      postData.append('scale_length', scaleLength);

      const response = await axios.post('http://127.0.0.1:5000', postData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


      const activity = await api.post('activity', {
        "egg_inside" : response.data.egg_info[0].class,
        "egg_width" : response.data.egg_info[0].predicted_width,
        "egg_length" : response.data.egg_info[0].predicted_length,
        "user_id" : userId,
        "grade" : response.data.egg_info[0].grade
      } )


      navigate("/result", { state: { data: response.data } });
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    setNotif(true);
    setSuccess(false);
    setnotifMessages("Silakan ambil gambar dulu.");
  }
};

  return (
    <>
      <div className="flex flex-col h-screen px-16 py-0 overflow-hidden vm:px-5 md:px-14 md:py-0">
        <Navbar users={username} />
        <div className="flex items-center min-h-full text-[#3E0000] vm:flex-col">
          <div className="basis-1/2 flex flex-col m-9 relative h-max bg-slate-200 box-border border-[#3E0000] border-2">
            {isShowVideo ? (
              <Webcam className="w-full h-full object-cover" audio={false} ref={videoElement} screenshotFormat="image/png" />
            ) : (
              <img
                className="w-full h-full object-cover"
                src={capturedImage}
                alt="Captured"
              />
            )}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <ButtonCstm
                img={Camera}
                event={capture}
                color={"bg-[#3E0000]"}
                radius={"rounded-full"}
              />
            </div>
          </div>
          <div className="basis-1/2 flex flex-col">
            <div className="flex justify-around vm:flex-col gap-5">
              <ButtonCstm
                event={handleNextClick}
                color={"bg-[#1C8C00] text-white"}
                radius={"rounded-3xl"}
                text={"Lanjut"}
              />
              <ButtonCstm
                event={retake}
                color={"bg-[#004CDF] text-white px-10"}
                radius={"rounded-3xl"}
                text={"Ambil Ulang"}
              />
            </div>
            <img className="w-[580px] mt-5 vm:hidden" src={Vector} alt="" />
          </div>
        </div>
      </div>
      {notif && (
        <PopUp
          icon={succes ? centang : gagal}
          text={succes ? "Berhasil" : "Ups"}
          Message={notifMessages}
          Confirmation={false}
          close={() => setNotif(false)}
        />
      )}
    </>
  );
}
