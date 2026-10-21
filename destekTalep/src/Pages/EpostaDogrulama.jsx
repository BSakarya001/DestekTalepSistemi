import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'


function EpostaDogrulama() {

  const [kod,setKod]=useState("");
  const [eposta,setEposta]=useState(localStorage.getItem("doğrulanacakEposta") || ""
);
  const [mesaj,setMesaj]=useState("");
  const [hata,setHata]=useState("");
  const navigate=useNavigate();

  useEffect(() =>{
    const eposta=
    localStorage.getItem("doğrulanacakEposta");
    if(!eposta){
      navigate('/');
    }
  },[navigate]);

  const EpostaDogrulama = async () =>{
    setHata("");
    setMesaj("");

    if (eposta.trim() === "" || kod.trim() ==="")
      {
      setHata("Lütfen e-posta ve dogrulama kodunu giriniz!");
      return;
    }
     
    try{
      await axios.post("https://localhost:7154/api/kullanicilar/EpostaDogrula",
        null,
        {
          params:
       {
         kod:kod,
        eposta:eposta
       }
      });
      setMesaj("Eposta başarıyla doğrulandı!");
      localStorage.removeItem("doğrulanacakEposta");
      setTimeout(() =>{
        navigate('/');
      },1000)
    }
 catch(hata) {
    console.log("Status:", hata.response?.status);
    console.log("Data:", hata.response?.data);

    setHata("E-posta doğrulama başarısız. Doğrulama kodunu kontrol ediniz.");
}
  };

  return (
   <div className="container col-md-5 mt-5">
    <h2 className='text-center mb-4'>E-posta Doğrulama </h2>
    <p className='text-center mb-4 text-muted'>E-posta adresinize gönderilen doğrulama kodunu giriniz.</p>
     <form >
        
        {
          hata &&(
            <div className='alert alert-danger'>
               {hata}
            </div>
          )
        }
        
        {
          mesaj && (
            <div className='alert alert-success'>
               {mesaj}
            </div>
          )
        }





     
     <div className="form-group mb-3">
      <label>E-posta Adresi</label>

      <input type="email" className='form-control' value={eposta} readOnly />


     </div>




       <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Doğrulama Kodu</label>
<input type="text" className="form-control" value={kod} onChange={(e)=>setKod(e.target.value)} placeholder="Doğrulama Kodunu Giriniz" />
  </div>

  <button className="btn btn-primary btn-block" type="button" onClick={EpostaDogrulama}>Doğrula</button>

  <button className="btn btn-secondary btn-block mt-2 " type="button">Kodu Tekrar Gönder</button>

  <div className="text-center mt-3">
    <Link to='/'>Giriş Sayfasına Dön</Link>
  </div>


     
     </form>

   
   </div>
  )
}

export default EpostaDogrulama