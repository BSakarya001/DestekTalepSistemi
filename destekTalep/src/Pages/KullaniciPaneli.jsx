import React,{useEffect,useState} from 'react'
import axios from 'axios'

function KullaniciPaneli() 
{
  const [talepler,setTalepler]=useState([]);
  const [hata,setHata]=useState("");

  useEffect(() =>{
    TumTalepleriGetir();
  },[]);

  const TumTalepleriGetir = async ()  =>{
    setHata("");

    try{
      const token=localStorage.getItem("token");
      const cevap= await axios.get("https://localhost:7154/api/Talepler/TumTalepleriGetir",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
       
      const kullanici=JSON.parse(localStorage.getItem("kullanici"));
      
      const benimTaleplerim=cevap.data.filter(
        (x)=>x.kullaniciId === kullanici.id
      );

      setTalepler(benimTaleplerim);
}catch{
  setHata("Talepler getirilemedi.");
}
  };


  return (
    <div className="container mt-5">
      <h2 className='mb-4'>Kullanıcı  Paneline Hoş Geldiniz</h2>
      <h5 className='mb-5'>Bugünkü Durum</h5>

          {hata && (
  <div className="alert alert-danger">
    {hata}
  </div>
)}

      <div className="row mb-5">

        <div className="col-md-3 text-primary">
          <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Toplam İade </h5>
              <h2 className='fw-bold'>{talepler.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 text-warning">
          <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Bekleyen İadeler</h5>
              <h2 className='fw-bold'>{talepler.filter(x => x.durum==="Bekliyor").length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 text-success">
        <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Onaylanan İadeler</h5>
              <h2 className='fw-bold'>{talepler.filter(x=> x.durum==="Onaylandı").length}</h2>
            </div>
          </div>

        </div>
        <div className="col-md-3 text-danger">
          <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Reddedilen İadeler</h5>
              <h2 className='fw-bold'>{talepler.filter(x => x.durum ==="Reddedildi").length}</h2>
            </div>
          </div>
        </div>
      </div>
       
       <div className="container">
        <h2 className='mb-5'>Son İade Talepleri</h2>
        <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Talep No</th>
      
      <th scope="col">Sipariş No</th>
      <th scope="col">Ürün</th>
      <th scope="col">Durum</th>
      <th scope="col">Tarih</th>
      
    </tr>
  </thead>
  
 
<tbody>
  {talepler
    .sort((a, b) => new Date(b.olusturmaTarihi) - new Date(a.olusturmaTarihi))
    .slice(0, 5)
    .map((talep) => (
      <tr key={talep.id}>
        <td>{talep.id}</td>
        <td>{talep.siparisNo}</td>
        <td>{talep.urunAdi}</td>

        <td
          className={
            talep.durum === "Bekliyor"
              ? "text-warning"
              : talep.durum === "Onaylandı"
              ? "text-success"
              : "text-danger"
          }
        >
          {talep.durum}
        </td>

        <td>
          {new Date(talep.olusturmaTarihi).toLocaleDateString("tr-TR")}
        </td>
      </tr>
    ))}
</tbody>


    




    
  
</table>
       </div>
     



    </div>
  )
}

export default KullaniciPaneli