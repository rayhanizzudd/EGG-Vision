import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import PopUp from "../../components/PopUp";


const AddAccountP = ({props, setNotif, setMessages, setSuccess, onAddUser}) => {
  const [isShow, setShow] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  
  const FormSchema = z.object({
    username: z.string().min(1, "Username tidak boleh kosong").regex(/^\S*$/, "Username tidak boleh ada spasi"),
    password: z.string().min(1, "Password tidak boleh kosong").regex(/^[^\s]*$/, "Password tidak boleh ada karakter khusus dan spasi"),
    status: z.string().min(1, "Status wajib diisi"),
    role: z.string().min(1, "Role wajib diisi"),
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    try {
      FormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      setNotif(true);
      setSuccess(false);
      setMessages("Please fix the errors in the form");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/addusers",
        formData
      );
      console.log("Data berhasil ditambahkan:", response.data);
      setFormData({
        username: "",
        password: "",
        role: "",
        status: "",
      });
      setShow(false);
      setTimeout(function() {}, 2000);
      setNotif(true);
      setSuccess(true);
      setMessages("Berhasil Menambahkan Data");
      onAddUser(response.data)
    } catch (error) {
      console.error("Gagal menambahkan data:", error);
      setNotif(true);
      setSuccess(false);
      setMessages("Gagal menambahkan data");
    }
  };

  const buttonClick = () => {
    setShow(true);
  };

  return (
    <>
      <button
        onClick={buttonClick}
        className="btn mt-3 ml-3 px-6 py-3 border-2 border-white rounded-tr-2xl rounded-tl-2xl text-white font-normal"
      >
        Tambah Akun
      </button>
      {isShow ? (
        <div className="flex justify-center items-center backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-1/2 my-12 mx-auto vm:w-full">
            <div className="border-white border-2 w-50% bg-[#610000] rounded-lg shadow-lg relative flex flex-col w-full bg-primary outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-xl font-bold text-white">Tambah Data</h3>
              </div>
              <div className="relative flex-auto gap-4">
                <form className="px-8 pt-6 pb-8 w-full" onSubmit={handleSubmit}>
                  <div className={"flex flex-col"}>
                    <label className="block text-white text-md font-medium mb-1">
                      Username
                    </label>
                    <input
                      placeholder="Username"
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="text-black shadow-md px-3 py-3 rounded-md"
                    />
                    {errors.username && (
                      <p className="text-white text-xs italic">{errors.username}</p>
                    )}
                  </div>
                  <div className={"flex flex-col mt-4"}>
                    <label className="block text-white text-md font-medium mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="New Password"
                      className="text-black shadow-md px-3 py-3 rounded-md"
                    />
                    {errors.password && (
                      <p className="text-white text-xs italic">{errors.password}</p>
                    )}
                  </div>
                  <div className="mb-5 mt-5">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className=" bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled value="">
                        Status
                      </option>
                      <option value="aktif">Aktif</option>
                      <option value="tidak aktif">Tidak Aktif</option>
                    </select>
                    {errors.status && (
                      <p className="text-white text-xs italic">{errors.status}</p>
                    )}
                  </div>
                  <div className="mb-5 mt-5">
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className=" bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled value="">
                        Role
                      </option>
                      <option value="admin">Admin</option>
                      <option value="pegawai">Pegawai</option>
                    </select>
                    {errors.role && (
                      <p className="text-white text-xs italic">{errors.role}</p>
                    )}
                  </div>
                </form>
              </div>
              <div className="px-8 flex items-center justify-between p-3 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-white w-full bg-[#3E0000] active:bg-[#610000da] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => {
                    setShow(false);
                    setFormData({
                      username: "",
                      password: "",
                      role: "",
                      status: "",
                    });
                  }}
                >
                  Batal
                </button>
                <button
                  className="text-white w-full bg-[#3E0000] active:bg-[#610000da] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={handleSubmit}
                >
                  Tambah Akun
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddAccountP;
