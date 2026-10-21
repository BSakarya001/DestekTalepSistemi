import React,{useState} from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'

function KayitOl() {
const [adSoyad,setAdSoyad]=useState("");
const [eposta,setEposta]=useState("");
const [sifre,setSifre]=useState("");
const [sifreTekrar,setSifreTekrar]=useState("");
const [mesaj,setMesaj]=useState("");
const [hata,setHata]=useState("");
const navigate=useNavigate();



const KayitOlTikla =async() =>
{
  setHata("");
  setMesaj("");
  if(adSoyad.trim() === "" ||
     eposta.trim() === "" || 
     sifre.trim() === "" ||
    sifreTekrar.trim() === ""){
      setHata("Lütfen tüm alanları doldurunuz:");
      return;
    }
    if(!eposta.includes("@") || !eposta.includes(".com")){
      setHata("Geçerli bir e-posta adresi giriniz:");
      return;
    }

    if(sifre.length<6){
     setHata("Şifre en az 6 karakter olmalıdır.");
      return;

    }







   if(sifre !== sifreTekrar){
    setHata("Şifreler aynı değil!");
    return;
   }
   try{
    await axios.post("https://localhost:7154/api/Kullanicilar/KayitOl",
      {
      adSoyad:adSoyad,
      eposta:eposta,
      sifre:sifre,
      rol:"Kullanici",
      aktifMi:true
      }
    );
    setMesaj("Kayıt başarılı! E-posta adresinize doğrulama kodu gönderildi.");
    localStorage.setItem("doğrulanacakEposta",eposta);
    setTimeout(() =>{
      navigate('/eposta-dogrulama');
    },1000);
  }catch(hata){
      setHata("Kayıt başarısız!");
    }

   


};




  return (
    <div className="container col-md-5">
      <h1 className='text center'>DESTEK TALEP SİSTEMİ</h1>
      <h3 className='text-center'>Kayit Ol</h3>
      <form >
      

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
           

          <div className="form-group">
    <label htmlFor="exampleInputEmail1">Ad Soyad</label>
    <input type="text" className="form-control" value={adSoyad} onChange={(e) =>
       setAdSoyad(e.target.value)} />
   </div>

 <div className="form-group">
    <label htmlFor="exampleInputEmail1">E-posta Adresi</label>
    <input type="email" className="form-control" value={eposta} onChange={(e) =>setEposta(e.target.value)}/>
   </div>
   
   <div className="form-group">
    <label htmlFor="exampleInputEmail1">Şifre</label>
    <input type="password" className="form-control" value={sifre} onChange={(e)=> setSifre(e.target.value)}/>
  </div>

 
<div className="form-group">
    <label htmlFor="exampleInputEmail1">Şifre tekrar</label>
    <input type="password" className="form-control" value={sifreTekrar} onChange={(e)=>setSifreTekrar(e.target.value)}/>
  </div>

   <button type="button" className="btn btn-primary" onClick={KayitOlTikla}>KAYIT OL</button>
   
     <div className='d-flex justify-content-between mt-3'>
      <span>Zaten hesabın var mı?</span>
      <Link to='/'>Giriş Yap</Link>
     </div>

      </form>
    </div>





  )
}

export default KayitOl