import React, { useState } from "react";
import { dataAcccount } from "../../hooks/admin/DataAccount";

const UpdateAccount = (props) => {
  const [isShow, setShow] = useState(false);
  const [originalData, setOriginalData] = useState({
    username: props.username,
    role: props.role,
    status: props.status,
  });
  const [updatedData, setUpdatedData] = useState(originalData);
  const [errorMessage, setErrorMessage] = useState()
  const {onUpdate} = props
  const { putData } = dataAcccount();

  const handleUpdate = async () => {
    await putData(updatedData, props.id);
    setShow(false);
    props.setNotif(true);
    props.setSuccess(true);
    props.setMessages("Berhasil Memperbarui Data");
    onUpdate()
  };

  const handleChange = (event) => {
    setUpdatedData({
      ...updatedData,
      [event.target.name]: event.target.value,
    });
  };

  const openModal = () => {
    setShow(true);
    setOriginalData({
      username: props.username,
      role: props.role,
      status: props.status,
    });
    setUpdatedData({
      username: props.username,
      role: props.role,
      status: props.status,
    });
  };

  const closeModal = () => {
    setShow(false);
    setUpdatedData(originalData);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="btn w-[100px] py-2 border-2 border-white rounded-br-2xl rounded-bl-2xl text-white font-normal"
      >
        Edit
      </button>
      {isShow && (
        <div className="flex justify-center items-center backdrop-blur-sm overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-1/2 my-12 mx-auto vm:w-full">
            <div className="border-white border-2 w-50% bg-[#610000] rounded-lg shadow-lg relative flex flex-col w-full bg-primary outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-xl font-bold text-white">Update Data</h3>
              </div>
              <div className="relative flex-auto gap-4">
                <form className="px-8 pt-6 pb-8 w-full" action="">
                  <div className="flex flex-col">
                    <label className="block text-white text-md font-medium mb-1">
                      Username
                    </label>
                    <input
                      placeholder="Username"
                      type="text"
                      id="username"
                      name="username"
                      value={updatedData.username}
                      onChange={handleChange}
                      className="text-black shadow-md px-3 py-3 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="block text-white text-md font-medium mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={updatedData.password || ""}
                      onChange={handleChange}
                      placeholder="New Password"
                      className="text-black shadow-md px-3 py-3 rounded-md"
                    />
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
                      value={updatedData.status}
                      onChange={handleChange}
                      className="mb-5 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="aktif">Aktif</option>
                      <option value="tidak aktif">Tidak Aktif</option>
                    </select>
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
                      value={updatedData.role}
                      onChange={handleChange}
                      className="mb-5 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="pegawai">Pegawai</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="px-8 flex items-center justify-between p-3 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-white w-full bg-[#3E0000] active:bg-[#610000da] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  className="text-white w-full bg-[#3E0000] active:bg-[#610000da] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={handleUpdate}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateAccount;
