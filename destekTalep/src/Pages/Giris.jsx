
import React,{useState} from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'


function Giris() {
 
  const [eposta,setEposta]=useState("");
  const [sifre,setSifre]=useState("");
const [mesaj,setMesaj]=useState("");
const [hata,setHata]=useState("");

  const navigate=useNavigate();

  

  const GirisYap = async ()=>{
    setHata("");
    setMesaj("");


    if(eposta.trim()=== "" || sifre.trim()===""){
      setHata("Lütfen  e-posta ve şifreyi doldurunuz.");
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
    
    try{

     const cevap= await axios.post(
           "https://localhost:7154/api/Kullanicilar/GirisYap",
           {
            eposta:eposta,
            sifre:sifre
           }

      );
     
       console.log(cevap.data);
      localStorage.setItem("token",cevap.data.token);
      localStorage.setItem(
        "kullanici",
        JSON.stringify(cevap.data.kullanici)
      );

     if(cevap.data.kullanici.rol==="Admin"){
      setMesaj("Admin girişi başarılı!");
      setTimeout(() =>{
        navigate('/admin')
      },1000);

     }
     else{
      setMesaj("Kullanıcı girişi başarılı!");
      setTimeout(() =>{
        navigate('/dashboard')
      },1000);
     }
    }
    catch(hata){
      console.log(hata.response);
      console.log(hata.response?.data);
      setHata(hata.response?.data,"Giriş yapılamadı.");
    }

  }


  return (
    <div className="container col-md-5">
      <form>

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

  <h1 className="text-center">
    DESTEK TALEP SİSTEMİ
  </h1>
      <h3>Giriş Yap</h3>
      <div className="form-group">
    <label htmlFor="exampleInputEmail1">E-posta Adresi</label>
    <input type="email" className="form-control" value={eposta} onChange={(e) => setEposta(e.target.value)} />
   </div>

<div className="form-group">
    <label htmlFor="exampleInputEmail1">Şifre</label>
    <input type="password" className="form-control" value={sifre} onChange={(e) => setSifre(e.target.value)}/>
  </div>

<div className="mt-3">

<button type='button' className='btn btn-success w-100 mb-2' onClick={GirisYap}>
 Giriş Yap
</button>

</div>



<div className='d-flex justify-content-between mt-3'>
  <Link to='/sifremi-unuttum'>Sifremi Unuttum? </Link>
  <Link to='/kayit'>Kayıt Ol</Link>
</div>




      </form>
    </div>
  )
}

export default Giris