import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar.jsx";
import TableData from "../../components/TableData.jsx";
import {refreshToken} from "../../hooks/authentication/refreshToken.js";
import {useTokenValidation} from "../../hooks/authentication/useTokenValidation.js";
import api from "../../lib/apiConfig.js"
import Pagination from "../../components/pagination.jsx";
import * as XLSX from "xlsx";
import PopUp from "../../components/PopUp.jsx";
import tanda_seru from "../../assets/tanda_seru.svg";

const RiwayatPegawai = () => {
  const { tokenData, username, exp, userId } = refreshToken();
  const columns = ["Telur", "Ukuran", "Kondisi", "Grade"];
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [data, setData] = useState([]);
  useTokenValidation(tokenData, exp);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  const [isDownload, setDownload] = useState(false)

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
  }

  const fetchData = async () => {
    try {
      const response = await api.get(`activity/${userId}`);
      const transformedData = response.data.map((row, index) => {
        const { formattedDate, formattedTime } = formatDate(row.date_log);
        return {
          Telur: index + 1,
          Tanggal: formattedDate,
          Waktu: formattedTime,
          Ukuran: `${parseFloat(row.egg_length).toFixed(2)} cm x ${parseFloat(row.egg_width).toFixed(2)} cm`,
          Kondisi: row.egg_inside,
          Grade: row.grade
          // Lanjutkan untuk setiap kolom yang ingin Anda tampilkan
        };
      });
      
      setData(transformedData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

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
  

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <>
      <div className="flex flex-col h-screen px-16 overflow-hidden vm:px-5 md:px-14">
        <Navbar users={username} />
        <div className="flex mt-20 items-center flex-col vm:mt-5">
          <TableData columns={columns} data={currentPosts} title="Riwayat Aktivitas" unduh={true} fncUnduh={() => {setDownload(true)}}/>
        <Pagination
                totalPosts={data.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPosts}
            />
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

export default RiwayatPegawai;