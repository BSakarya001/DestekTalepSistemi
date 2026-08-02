import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,useNavigate} from 'react-router-dom'

function TalepDetay() {
  const {id} = useParams();
  const [talep,setTalep]=
  useState({});

  useEffect(() => {
    TalepDetayGetir();
  },[]);
  const TalepDetayGetir = async () =>
   {
    try{
      const cevap= await axios.get("https://localhost:7154/api/Talepler/TalepDetay/" + id);
          setTalep(cevap.data)
    }
    catch{
      alert("Talep bulunamadı!");
    }
  
   };

   const navigate=useNavigate(); 

   const TalepGuncelle = async () => {
    try{
      await axios.put( "https://localhost:7154/api/Talepler/TalepGuncelle/" + talep.id,
      talep);
      alert("Talep başarıyla güncellendi!");

    }catch{
      alert("Talep güncellenemedi");

    }
   };



  return (
    <div className="container col-md-6 mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4>Talep Detayı</h4>

        </div>
       <div className="card-body">
        <p><strong>Talep No:</strong>{talep.id}</p>
        <div className="form-group mb-3">
  <label>Sipariş No</label>
  <input
    type="text"
    className="form-control"
    value={talep.siparisNo || ""}
    onChange={(e) =>
      setTalep({ ...talep, siparisNo: e.target.value })
    }
  />
</div>
        <div className="form-group mb-3">
  <label>Ürün Adı</label>
  <input
    type="text"
    className="form-control"
    value={talep.urunAdi || ""}
    onChange={(e) =>
      setTalep({ ...talep, urunAdi: e.target.value })
    }
  />
</div>
        <div className="form-group mb-3">
          <label >İade Nedeni</label>
          <select className='form-control' value={talep.iadeNedeni || ""}
           onChange={(e) =>
             setTalep({...talep,iadeNedeni: e.target.value})
          }
             >
         <option value="">Seçiniz</option>
          <option>Hasarlı Ürün</option>
          <option>Yanlış Ürün</option>
          <option>Eksik Ürün</option>
          <option>Ürünü Beğenmedim</option>
           <option>Diğer</option>
          </select>
        </div>
       <div className="form-group mb-3">
  <label>Durum</label>
  <select
    className="form-control"
    value={talep.durum || ""}
    onChange={(e) =>
      setTalep({ ...talep, durum: e.target.value })
    }
  >
    <option value="Bekliyor">Bekliyor</option>
    <option value="Onaylandı">Onaylandı</option>
    <option value="Reddedildi">Reddedildi</option>
  </select>
</div>
<div className="form-group mb-3">
  <label>Öncelik</label>
  <select
    className="form-control"
    value={talep.oncelik || ""}
    onChange={(e) =>
      setTalep({ ...talep, oncelik: e.target.value })
    }
  >
    <option value="Düşük">Düşük</option>
    <option value="Orta">Orta</option>
    <option value="Yüksek">Yüksek</option>
  </select>
</div>
        <p><strong>Talep Tarihi:</strong>{talep.olusturmaTarihi}</p>
       <div className="form-group mb-3">
        <label >Açıklama</label>
        <textarea  className='form-control' rows="4" value={talep.aciklama || ""} onChange={(e) => setTalep({...talep,aciklama:e.target.value})
        }
        />
       </div>

        
        
        <p><strong>Ürün Fotoğrafı:</strong></p>
        <div className='border rounded p-5 text-center mb-3 '>
          Fotoğraf Önizleme
        </div>
        <h5 className="mt-4">Mesajlar</h5>

<div className="border rounded p-3 mb-3">
  <p><strong>Kullanıcı:</strong> Ürün kutudan hasarlı çıktı.</p>
  <small className="text-muted">22.07.2026 10:30</small>
</div>

<div className="border rounded p-3 mb-3 bg-light">
  <p><strong>Admin:</strong> Talebiniz incelenmektedir.</p>
  <small className="text-muted">22.07.2026 14:15</small>
</div>

<h5>Yeni Mesaj</h5>

<div className="form-group">
  <textarea
    className="form-control"
    rows="4"
    placeholder="Mesajınızı yazınız..."
  ></textarea>
</div>

<button className="btn btn-primary mb-3 mx-3"> Mesaj Gönder</button>
 

<button className='btn btn-warning mb-3 mx-3' onClick={TalepGuncelle}>Güncelle</button>

<button className='btn btn-secondary mb-3 mx-3' onClick={() => navigate('/taleplerim')}>Geri Dön</button>
        



       </div>
      </div>
    </div>
  )
}

export default TalepDetay