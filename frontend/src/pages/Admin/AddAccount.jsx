import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import DeleteAccount from "./DeleteAccount";
import UpdateAccount from "./UpdateAccount";
import axios, { formToJSON } from "axios";
import SideBar from "../../components/SideBar";

const Admin = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }),
    [];

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        formData
      );
      console.log("Data berhasil ditambahkan:", response.data);
    } catch (error) {
      console.error("Gagal menambahkan data:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="main w-full p-12">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <h3 className="font-bold text-base">EGG VISIONN</h3>
          </Link>

          <form className="">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-[#DCDCDC] "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="bg-[#A3A3A3] text-[#DCDCDC] block w-full p-4 ps-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 "
                placeholder="Search"
                required
              />
              {/* <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </form>
        </div>

        <div className="font-bold text-4xl">Halaman Tambah Data</div>

        <div className="flex flex-col mt-5 bg-[#610000] rounded-lg text-white p-0 m-0">
          <div className="flex flex-col w-full">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <form
                    className="p-10 w-full"
                    action=""
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-5">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your Username
                      </label>
                      <input
                        type="text"
                        id="username" // Mengubah id menjadi "username"
                        name="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div class="mb-5">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Password"
                        autoComplete="off"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option disabled value="">
                          Status
                        </option>
                        <option value="aktif">Aktif</option>
                        <option value="tidak aktif">Tidak Aktif</option>
                      </select>
                      <div className="mb-5">
                        <label
                          htmlFor="role"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Role
                        </label>
                        <select
                          id="role"
                          name="role"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={formData.role}
                          onChange={handleChange}
                        >
                          <option disabled value="">
                            Role
                          </option>
                          <option value="admin">Admin</option>
                          <option value="pegawai">Pegawai</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-row space-x-10">
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Tambah Data
                      </button>
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={Navigate("dashboard/admin")}
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="side w-1/4">
        <SideBar />
      </div>
    </div>
  );
};

export default Admin;
