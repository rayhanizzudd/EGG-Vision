import React, { useState, useEffect } from "react";
import TableData from "../../components/TableData";
import SideBar from "../../components/SideBar";
import { Link, } from "react-router-dom";
import { refreshToken } from "../../hooks/authentication/refreshToken.js";
import { useTokenValidation } from "../../hooks/authentication/useTokenValidation.js";
import api from "../../lib/apiConfig.js";
import Pagination from "../../components/pagination.jsx";

const RiwayatAdmin = () => {
  const { tokenData, username, role,  exp, userId } = refreshToken();
  useTokenValidation(tokenData, exp, role , "admin");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const columns = ["No", "Username", "Total"];
  const [data, setData] = useState([]);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  const fetchData = async () => {
    try {
      const response = await api.get(`activity-users`);
      // console.log('Response data:', response.data);
      const transformedData = response.data.map((row, index) => {
        let activityCount = row._count ? row._count.activity : 0; // Memeriksa apakah _count ada
        return {
          No: index + 1,
          Username: row.username,
          Total: activityCount,
          userId: row.id_user
        };
      });      
      
      setData(transformedData);
      console.log(data)
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  

  console.log("INILAH ",data)

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);
  return (
    <>

      <div className="flex relative h-screen">
<div className="main w-full p-12 flex-col vm:p-5">
  <div className="flex items-center justify-between">
    <Link to={"/"}>
      <h3 className="font-bold text-2xl">EGG VISION</h3>
    </Link>

    <form className="vm:hidden">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
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
  <div className="flex mt-5 items-center flex-col">
            <TableData
              columns={columns}
              data={data}
              title="Riwayat Aktivitas"
              detail={true}
              onDelete={fetchData}
            />
          <Pagination
                totalPosts={data.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPosts}
            />
          </div>
          </div>

<div className="side basis-1/4 vm:absolute vm:right-5 top-2">
  <SideBar />
</div>
</div>
    </>
  );
};

export default RiwayatAdmin;
