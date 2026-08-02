
import React,{useState} from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'


function Giris() {
 
  const [eposta,setEposta]=useState("");
  const [sifre,setSifre]=useState("");
  const navigate=useNavigate();

  

  const GirisYap = async ()=>{
    
    try{

     const cevap= await axios.post(
           "https://localhost:7154/api/Kullanicilar/GirisYap",
           {
            eposta:eposta,
            sifre:sifre
           }

      );
      alert(cevap.data.rol);
       console.log(cevap.data);
     if(cevap.data.rol==="Admin"){
      alert("Admin girişi başarılı!");
      navigate('/admin')

     }
     else{
      alert("Kullanıcı girişi başarılı!");
      navigate('/dashboard')
     }
    }
    catch(hata){
      console.log(hata.response);
      console.log(hata.response?.data);
      alert("E-posta veya şifre hatalı!");
    }





  }







  return (
    <div className="container col-md-5">
      <form >
      <h1 className='text-center '>DESTEK TALEP SİSTEMİ    </h1>
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