import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TableData from "../../components/TableData";
import { useTokenValidation } from "../../hooks/authentication/useTokenValidation";
import { refreshToken } from "../../hooks/authentication/refreshToken";
import api from "../../lib/apiConfig";
import SideBar from "../../components/SideBar";
import Pagination from "../../components/pagination.jsx";
import * as XLSX from "xlsx";
import PopUp from "../../components/PopUp.jsx";
import tanda_seru from "../../assets/tanda_seru.svg";

const RiwayatDetail = () => {
  const { tokenData, role, exp, userId } = refreshToken();
  useTokenValidation(tokenData, exp, role, "admin");
  const { username } = useParams();
  const columns = ["No", "Jam", "Tanggal", "Ukuran", "Kondisi"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const [isDownload, setDownload] = useState(false)

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return { formattedDate, formattedTime };
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`activity-users/detail/${username}`);
      const newHistory = response.data[0].activity;
      const transformedData = newHistory.map((row, index) => {
        const { formattedDate, formattedTime } = formatDate(row.date_log);
        return {
          No: index + 1,
          Jam: formattedTime,
          Tanggal: formattedDate,
          Ukuran: `${parseFloat(row.egg_length).toFixed(2)} cm x ${parseFloat(row.egg_width).toFixed(2)} cm`,
          Kondisi: row.egg_inside
        };
      });
      setData(transformedData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const downloadExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Riwayat Aktivitas");
    XLSX.writeFile(workbook, `RiwayatAktivitas_${username}.xlsx`);

    setDownload(false)
    } catch (error) {
      console.log('unduh riwayat gagal')
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
              </div>
            </form>
          </div>
          <div className="flex mt-5 justify-center items-center flex-col">
            <TableData
              unduh={true}
              columns={columns}
              data={currentPosts}
              title="Riwayat Aktivitas"
              fncUnduh={() => {setDownload(true)}}
            />
            <Pagination
              totalPosts={data.length}
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>

        <div className="side basis-1/4 vm:absolute vm:right-5 top-2">
          <SideBar />
        </div>
      </div>
      {isDownload &&
      <PopUp
      icon={tanda_seru}
      Confirmation={true}
      callback={downloadExcel}
      close={() => setDownload(false)}
      text="Yakin Unduh Data Riwayat?"
      unduh={true}
    />}
    </>
  );
};

export default RiwayatDetail;
