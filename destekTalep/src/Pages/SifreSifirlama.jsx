import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

function SifreSifirlama() {
const [eposta,setEposta]=useState("");
const [kod,setKod]=useState("");
const [yeniSifre,setYeniSifre]=useState("");
const [mesaj,setMesaj]=useState("");
const [hata,setHata]=useState("");

const navigate=useNavigate();

const SifreSifirla= async () =>{
    setHata("");
    setMesaj("");
    if(eposta.trim() === "" || kod.trim() === "" || yeniSifre.trim() === "" ){
        setHata("Lütfen tüm alanları doldurunuz.");
        return;
    }

   if(yeniSifre.length<6){
    setHata("Sifre en az 6 karakter olmalıdır.");
    return;
   }
   try
   {
    const cevap= await axios.post("https://localhost:7154/api/Kullanicilar/SifreSifirla",
        null,
        {
            params:{
                eposta:eposta,
                yeniSifre:yeniSifre,
                kod:kod
            }
        }
    );
   setMesaj(cevap.data);
   setTimeout(() =>{
        navigate('/')
      },1000);

}catch(hata){
    console.log(hata.response);
    setHata(hata.response?.data || "Sifre sıfırlanamadı.");
}
};
 return (

<div className="container col-md-5 mt-5">
    <h2 className="text-center mb-4">Şifre Sıfırlama</h2>



    

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

<div className="form-group mb-3">
    <label>E-posta Adresi</label>
    <input type="email" className='form-control' value={eposta} onChange={(e) => setEposta(e.target.value)} placeholder='E-posta adresinizi giriniz.'/>

</div>

<div className="form-group mb-3">
    <label>Şifre Sıfırlama Kodu</label>
    <input type="text" className='form-control' value={kod} onChange={(e) =>setKod(e.target.value)} placeholder='Kodunuzu giriniz.'/>
</div>

<div className="form-group mb-3">
    <label>Yeni Şifre</label>
    <input type="password" className='form-control' value={yeniSifre} onChange={(e) =>setYeniSifre(e.target.value)} placeholder='Yeni Şifrenizi giriniz.'/>
</div>


<button type='button' className='btn btn-primary btn-block' onClick={SifreSifirla}>
    Şifreyi Sıfırla

</button>

<div className="text-center mt-3">
    
   <Link to='/'>Giriş Sayfasına Dön</Link>
     </div>


</div>

    
  )
}

export default SifreSifirlama