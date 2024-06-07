import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListAkun from "./components/ListAkun";
import Login from "./pages/login";
import Home from "./pages/Pegawai/Home";
import Analytic from "./pages/Pegawai/Analytic";
import Admin from "./pages/Admin/Admin";
import Add from "./pages/Admin/AddAccount";
// import Edit from "./pages/Admin/EditAccount";
import ResultAnalis from "./pages/Pegawai/ResultAnalis";
import LandingPage from "./pages/LandingPage";
import RiwayatPegawai from "./pages/Pegawai/RiwayatPegawai";
import RiwayatAdmin from "./pages/Admin/RiwayatAdmin";
import RiiwayatDetail from "./pages/Riwayat/RiiwayatDetail";
import Dashboard from "./pages/Admin/Dashboard";
import Kalibrasi from "./pages/Pegawai/Kalibrasi";

export default function App() {
  return (
    <div className="bg-[#DCDCDC]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/result" element={<ResultAnalis />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/admin" element={<Admin />} />
          <Route path="/dashboard/add" element={<Add />} />
          <Route path="/user-riwayat" element={<RiwayatPegawai />} />
          <Route path="/riwayat" element={<RiwayatAdmin />} />
          {/* <Route path="/dashboard/edit" element={<Edit />} /> */}
          <Route path="/analytic/" element={<Analytic />} />
          <Route path="/Listakun" element={<ListAkun />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/kalibrasi" element={<Kalibrasi />} />
          <Route path="/user-riwayat/detail/:username" element={<RiiwayatDetail />} />
        </Routes>
    </div>
  );
}




