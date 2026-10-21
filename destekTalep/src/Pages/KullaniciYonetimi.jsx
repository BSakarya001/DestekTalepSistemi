import React, { useState,useEffect} from 'react'

import axios from 'axios'
import {  useNavigate } from 'react-router-dom';



function KullaniciYonetimi() {

  const [kullanicilar,setKullanicilar]=useState([]);
  const [hata,setHata]=useState("");
 const [mesaj,setMesaj]=useState("");

  const navigate=useNavigate();
  const TumKullanicilariGetir = async  () =>{

    setHata("");
    setMesaj("");
    try{
      const token=localStorage.getItem("token")
      const cevap= await axios.get("https://localhost:7154/api/Kullanicilar/TumKullanicilariGetir",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
     console.log(cevap.data);
      setKullanicilar(cevap.data)

    }
    catch(hata){
      console.log(hata);
      console.log(hata.response);
      setHata("Kullanıcılar getirilemedi.")
    }

  }
  useEffect(() =>{
    TumKullanicilariGetir();
  },[]);

  useEffect(() =>{
    const kullanici=JSON.parse(localStorage.getItem("kullanici"));

    if(!kullanici || kullanici.rol !== "Admin"){
      setHata("Bu sayfaya erişim yetkiniz yok.");
      setTimeout(() =>{
        navigate('/');
      },1000)
    }
  },[navigate]);







  const DurumDegistir = async(id) => {
  
     setHata("");
    setMesaj("");
   
    try{
      const token=localStorage.getItem("token");
      await axios.put(
     `https://localhost:7154/api/Kullanicilar/DurumDegistir/${id}`,{},
     {
      headers:{
        Authorization:`Bearer ${token}`
      }
     }
    );
    setMesaj("Kullanıcı durumu başarıyla değiştirildi.");
    TumKullanicilariGetir();

    }catch(hata){
      console.log(hata);
      setHata("Kullanıcı durumu değiştirilemedi.");
    }
 }




  return (
   <div className="container mt-5">
    <h2 className='text-center mb-5'>Kullanıcı Yönetimi</h2>

           {hata && (
  <div className="alert alert-danger">
    {hata}
  </div>
)}

{mesaj && (
  <div className="alert alert-success">
    {mesaj}
  </div>
)}




      
      <button type='button' className='btn btn-primary' onClick={() =>navigate('/admin')}>
        Geri Dön
      </button>

    <p className='text-muted text-center mb-4'>Sistemde kayıtlı kullanıcıları buradan yönetebilirsiniz.</p>
    <div className='table-responsive'>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
           <th>ID</th>
           <th>Ad Soyad</th>
           <th>E-posta</th>
           <th>Rol</th>
           <th>Durum</th>
           <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
        {kullanicilar.map((kullanici) =>
        (
          <tr key={kullanici.id}>
            <td>{kullanici.id}</td>
            <td>{kullanici.adSoyad}</td>
            <td>{kullanici.eposta}</td>
            <td>{kullanici.rol}</td>
            <td>
               {kullanici.aktifMi ? (
                  <span className='text-success'>Aktif</span>
) :(
    <span className='text-danger'>Pasif</span>
 ) }
 </td>

 <td>
   <button className="btn btn-warning btn-sm " onClick={() =>DurumDegistir(kullanici.id)}>{
    kullanici.aktifMi ? "Pasif Yap" : "Aktif Yap"}</button>
 </td>

 </tr>
 )
)
          }

        </tbody>
      </table>
    </div>

 </div>
  )
}

export default KullaniciYonetimi