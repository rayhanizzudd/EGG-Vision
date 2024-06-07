import React, { useState, useCallback, useRef, useEffect } from "react";
import Navbar from "../../components/NavBar";
import { useTokenValidation } from "../../hooks/authentication/useTokenValidation";
import { refreshToken } from "../../hooks/authentication/refreshToken";
import calibrationIcon from "../../assets/calibrationIcon.svg";
import Webcam from "react-webcam";
import ButtonCstm from "../../components/ButtonCstm";
import Camera from "../../assets/camera.svg";
import { calibration } from "../../hooks/calibration/Calibration";
import axios from "axios";
import PopUp from "../../components/PopUp";
import gagal from "../../assets/gagal.svg";
import centang from "../../assets/centang.svg";

const Kalibrasi = () => {
  const { tokenData, username, exp, role, userId } = refreshToken();
  useTokenValidation(tokenData, username, role, "pegawai");

  const { getCalibration, setCalibration, updateCalibration } = calibration();
  const [dataKalibrasi, setDataKalibrasi] = useState([]);
  const [updatedData, setUpdatedData] = useState({ length: 0, width: 0 });

  const [isShowVideo, setIsShowVideo] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoElement = useRef(null);

  const [notif, setNotif] = useState(false);
  const [notifMessages, setnotifMessages] = useState();
  const [succes, setSuccess] = useState(false);

  const handleChange = (event) => {
    setUpdatedData({
      ...updatedData,
      [event.target.name]: event.target.value,
    });

    console.log(updatedData);
  };

  const capture = useCallback(() => {
    if (videoElement.current) {
      const imageSrc = videoElement.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        setIsShowVideo(false);
        console.log("Gambar Di Ambil");
      } else {
        console.error("Failed to capture image");
      }
    } else {
      console.error("videoElement is null");
    }
  }, []);

  const handleNextClick = async () => {
    if (capturedImage) {
      if (!updatedData.length || !updatedData.width) {
        setNotif(true);
        setSuccess(false);
        setnotifMessages("Form harus diisi secara lengkap.");
        return;
      }
      try {
        const blob = await fetch(capturedImage).then((res) => res.blob());
        const file = new File([blob], "webcam_capture.jpeg", {
          type: "image/jpeg",
        });

        const postData = new FormData();
        postData.append("file", file);
        postData.append("real_width", updatedData.width);
        postData.append("real_length", updatedData.length);

        const response = await axios.post(
          "http://127.0.0.1:5000/calibration",
          postData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && Object.keys(response.data).length > 0) {
          const check = await getCalibration(userId);
          console.log("data", check);

          if (check.length > 0) {
            const updaCalibration = await updateCalibration(
              check[0].id_calibration,
              {
                length: response.data.calibration_info.real_length,
                width: response.data.calibration_info.real_width,
                scale_length: response.data.calibration_info.scale_length,
                scale_width: response.data.calibration_info.scale_width,
              }
            );
          } else {
            const addCalibration = await setCalibration({
              length: response.data.calibration_info.real_length,
              width: response.data.calibration_info.real_width,
              scale_length: response.data.calibration_info.scale_length,
              scale_width: response.data.calibration_info.scale_width,
              user_id: userId,
            });
          }
          setNotif(true);
          setSuccess(true);
          setnotifMessages("Data Kalibrasi Berhasil Di Simpan");
        } else {
          setNotif(true);
          setSuccess(false);
          setnotifMessages("Gambar Telur Tidak Di Temukan");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setNotif(true);
      setSuccess(false);
      setnotifMessages("Silakan ambil gambar dulu.");
    }
  };

  const retake = useCallback(() => {
    setCapturedImage(null);
    setIsShowVideo(true);
    console.log("Retake Foto");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getDataCalibration = await getCalibration(userId);
        setDataKalibrasi(getDataCalibration);
        if (getDataCalibration.length > 0) {
          setUpdatedData({
            length: getDataCalibration[0]?.length ?? 0,
            width: getDataCalibration[0]?.width ?? 0,
          });
        } else {
          setUpdatedData({ length: 0, width: 0 });
        }
      } catch (error) {
        console.error("Failed to fetch calibration data", error);
        setUpdatedData({ length: 0, width: 0 });
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <>
      <div className="flex flex-col h-screen px-16 py-4 overflow-hidden vm:px-5 md:px-14 vm:p-0">
        <Navbar users={username} />
        <div className="flex items-center min-h-full text-[#3E0000] vm:px-5 border-3 vm:flex-col-reverse vm:justify-end">
          <div className="basis-1/2">
            <h1 className="text-8xl font-extrabold vm:text-7xl vm:hidden">
              Kalibrasi
            </h1>
            <p className="text-2xl mt-4 vm:hidden">
              Kalibrasi akun anda agar lebih optimal
            </p>
            <div className="grid gap-3 mt-5 vm:place-items-center">
              <div className="flex gap-5 items-center">
                <p className="text-xl w-20">Panjang</p>
                <div className="border border-[#3E0000] p-1 px-3 rounded-xl box-border w-max max-w-xs flex items-center">
                  <input
                    type="number"
                    value={updatedData.length}
                    name="length"
                    onChange={handleChange}
                    min={0}
                    className="w-36 bg-transparent border-none focus:outline-none"
                  />
                  <span className="ml-2">cm</span>
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <p className="text-xl w-20">Lebar</p>
                <div className="border border-[#3E0000] p-1 px-3 rounded-xl box-border w-max max-w-xs flex items-center">
                  <input
                    type="number"
                    min={0}
                    name="width"
                    onChange={handleChange}
                    value={updatedData.width}
                    className="w-36 bg-transparent border-none focus:outline-none"
                  />
                  <span className="ml-2">cm</span>
                </div>
              </div>
            </div>
            <div className="flex gap-5 vm:justify-center">
              <button
                className="flex items-center gap-3 px-7 py-2 border-2 w-max rounded-2xl border-[#3E0000] bg-[#3E0000] text-white mt-9"
                onClick={handleNextClick}
              >
                <span>
                  <img src={calibrationIcon} alt="icon calibration" />
                </span>
                Kalibrasi
              </button>
              <button
                onClick={retake}
                className="flex items-center gap-3 px-7 py-2 border-2 w-max rounded-2xl border-[#3E0000] bg-[#3E0000] text-white mt-9"
              >
                <span>
                  <img src={calibrationIcon} alt="icon calibration" />
                </span>
                Retake
              </button>
            </div>
          </div>
          <div className="w-2/4 flex flex-col m-9 relative h-max bg-slate-200 box-border border-[#3E0000] border-2 vm:w-full">
            {isShowVideo ? (
              <Webcam
                className="w-full h-full object-cover"
                audio={false}
                ref={videoElement}
                screenshotFormat="image/png"
              />
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
          <div className="mt-3 flex flex-col items-start md:hidden">
            <h1 className="text-8xl font-extrabold vm:text-5xl">Kalibrasi</h1>
            <p className="text-xl">Kalibrasi akun anda agar lebih optimal</p>
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
};

export default Kalibrasi;
