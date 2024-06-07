import React, { useState, useEffect } from "react";
import axios from "axios";
import centang from "../../assets/centang.svg";
import tanda_seru from "../../assets/tanda_seru.svg";
import gagal from "../../assets/gagal.svg";
import {PopUp} from "../../components/PopUp";

const DeleteAccount = (props) => {
  const [isShow, setShow] = useState(false);
  const {onDelete} = props

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/${props.id}`);
      console.log(response)

      if (response.status == 200) {
        setShow(false)
        props.setNotif(true)
        props.setSuccess(true)
        props.setMessages("Data Anda Berhasil Di Hapus")
        onDelete()
      } else if (response.status == 204){
        setShow(false)
        props.setNotif(true)
        props.setSuccess(false)
        props.setMessages("Tidak berhasil Menghapus Data")
        console.log("Tidak berhasil Menghapus Data")
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="btn px-6 py-2 border-2 border-white rounded-br-2xl rounded-bl-2xl text-white font-normal"
      >
        Delete
      </button>
      {isShow && (
        <PopUp
          icon={tanda_seru}
          Confirmation={true}
          callback={handleDelete}
          close={() => setShow(false)}
          text="Apakah Anda Ingin Menghapus?"
        />
      )}
    </>
  );
};

export default DeleteAccount;
