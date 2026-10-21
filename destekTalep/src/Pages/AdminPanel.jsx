import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function AdminPanel() {
  const navigate=useNavigate();
   
  useEffect(() => {
     const kullanici=JSON.parse(localStorage.getItem("kullanici"));


     if(!kullanici || kullanici.rol !== "Admin"){
      alert("Bu sayfaya erişim yetkiniz yok.");
      navigate('/')
     }

  },[navigate]);





   const [talepler,setTalepler]=useState([]);
   useEffect(() => {
    TumTalepleriGetir();
   },[]);

   const TumTalepleriGetir= async () => 
   
    {
    try{
      const token=localStorage.getItem("token");
      const cevap=  await
      axios.get(  "https://localhost:7154/api/Talepler/TumTalepleriGetir",

        {
         headers:{
          Authorization:`Bearer ${token}`
         }
        }



      );

      setTalepler(cevap.data);
 }
 catch(hata){
  console.log(hata);
  alert(hata.message);
 }
   };

   const toplamTalep=talepler.length;
   const bekleyenTalep=talepler.filter((x)=>x.durum==="Bekliyor").length;
   const onaylananTalep=talepler.filter((x)=>x.durum==="Onaylandı").length;
   const reddedilenTalep=talepler.filter((x)=>x.durum==="Reddedildi").length;
   



  return (
    <div className="container">
      <h2 className='mb-4 '>Admin Paneli </h2>
      <h5 className='mb-5 text-muted'>Genel Durum</h5>
      
      <div className="row mb-5">
        <div className="col-md-3 text-primary">
          <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Toplam İade </h5>
              <h2 className='fw-bold'>{toplamTalep}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 text-warning">
           <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Bekleyen İadeler</h5>
              <h2 className='fw-bold'>{bekleyenTalep}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 text-success">
          <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Onaylanan İadeler</h5>
              <h2 className='fw-bold'>{onaylananTalep}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 text-danger">
           <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Reddedilen İadeler</h5>
              <h2 className='fw-bold'>{reddedilenTalep}</h2>
            </div>
          </div>
        </div>

      </div>
      <div className="mb-4">
          <button className='btn btn-primary'
           onClick={() => navigate('/admin-talep-yonetimi')}>
            Talepleri Yönet
            </button>
            <button className="btn btn-success mx-4" onClick={() => navigate('/kullanicilar')}>Kullanıcı Yönetimi</button>

      </div>
       <div className="container">
        <h3 className='mt-5 mb-4'>Son Gelen Talepler</h3>
       
       < div className='table-responsive'>
           <table className="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">Talep No</th>
      <th scope="col">Kullanıcı</th>
      <th scope="col">Sipariş No</th>
      <th scope="col">Ürün</th>
      <th scope="col">Durum</th>
      <th scope="col">Tarih</th>
      <th scope="col">İşlem</th>

      
    </tr>
  </thead>
  <tbody>
{
 talepler
  .sort((a, b) => new Date(b.olusturmaTarihi) - new Date(a.olusturmaTarihi))
  .slice(0, 5)
  .map((talep) => (
    <tr key={talep.id}>
      <td>{talep.id}</td>
      <td>{talep.kullaniciId}</td>
      <td>{talep.siparisNo}</td>
      <td>{talep.urunAdi}</td>
      <td>{talep.durum}</td>
      <td>{talep.olusturmaTarihi}</td>
      <td>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/talep-detay/" + talep.id)}
        >
          İncele
        </button>
      </td>
    </tr>
  ))
}
</tbody>
</table>

        </div>
       </div>

    </div>
  )
}

export default AdminPanel
