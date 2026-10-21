import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

function SifremiUnuttum() {
const [eposta,setEposta]=useState("");
const [hata,setHata]=useState("");
const [mesaj,setMesaj]=useState("");
const navigate=useNavigate();

const SifreSıfırlamaKoduGonder = async () =>{
    setHata("");
    setMesaj("");

  if(eposta.trim() === ""){
    setHata("LÜtfen e-posta adresinizi giriniz.");
    return;
  }
try{
   const cevap=await axios.post("https://localhost:7154/api/Kullanicilar/SifreSifirlamaKoduGonder",
    null,
    {
      params:{
        eposta:eposta
      }

    }
   );
   setMesaj("cevap.data.mesaj");
  
   setTimeout(() =>{
    navigate('/sifre-sifirlama')
   },1000);
}catch(hata){
  console.log(hata.response);
  setHata(hata.response?.data || "Sifre sıfırlama kodu gönderilemedi.");
}
};









  return (
   
    <div className="container  col-md-5 mt-5">
      <h1 className='text-center'>DESTEK TALEP SİSTEMİ</h1>
      <h3 className='text-center'>Şifremi Unuttum</h3>
      <form >
          {
            hata && (
              <div className='alert alert-danger'>{hata}</div>
            )
          }

            {
              mesaj && (
                <div className='alert alert-success'>{mesaj}</div>
              )
            }

        <div className="form-group">
    <label htmlFor="exampleInputEmail1">E-posta Adresi</label>
    <input type="email" className="form-control" value={eposta} onChange={(e)=>setEposta(e.target.value)} aria-describedby="emailHelp"/>
   </div>

     <button type='button' className='btn btn-primary btn-block' onClick={SifreSıfırlamaKoduGonder}>ŞİFRE SIFIRLAMA BAĞLANTISI GÖNDER</button>
     <div className='d-flex justify-content-between mt-3'>
           <span>Şifreni hatirladin mi?</span>
           <Link to='/'>Giriş Yap</Link>
          </div>
      </form>
    </div>
    
  )
}

export default SifremiUnuttum