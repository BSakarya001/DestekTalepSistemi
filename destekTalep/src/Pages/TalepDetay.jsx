import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,useNavigate} from 'react-router-dom'

function TalepDetay() {
  const {id} = useParams();
  const [talep,setTalep]=
  useState({});
  const [mesajlar,setMesajlar]=useState([]);
const [yeniMesaj,setYeniMesaj]=useState("");

  const [mesaj,setMesaj]=useState("");
  const[hata,setHata]=useState("");
  const [rol,setRol] = useState({});

useEffect(() => {
  const kayitliKullanici = JSON.parse(localStorage.getItem("kullanici"));

  if (kayitliKullanici) {
    setRol(kayitliKullanici.rol);
  }

  TalepDetayGetir();
  MesajlariGetir();
}, []);
  const TalepDetayGetir = async () =>
   {
    try{
      const token=localStorage.getItem("token");
      const cevap= await axios.get("https://localhost:7154/api/Talepler/TalepDetay/" + id,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
          setTalep(cevap.data)
    }
    catch(err){
      console.log(err.response);
     setHata("Talep bulunamadı!");
    }
  
   };

    const MesajlariGetir = async () => {
  try {
    const token = localStorage.getItem("token");

    const cevap = await axios.get(
      "https://localhost:7154/api/Mesajlar/MesajlariGetir/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setMesajlar(cevap.data);

  } catch (hata) {
    console.log(hata.response);
  }
};




   const navigate=useNavigate(); 

   const TalepGuncelle = async () => {
    setMesaj("");
    setHata("");
    try{
      const token=localStorage.getItem("token");
      await axios.put( "https://localhost:7154/api/Talepler/TalepGuncelle/" + talep.id,
      talep,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
      setMesaj("Talep başarıyla güncellendi!");

    }catch(err){
      console.log(err.response);
     setHata("Talep güncellenemedi");

    }
   };

const MesajGonder = async () => {
  setMesaj("");
  setHata("");

  if (yeniMesaj.trim() === "") {
    setHata("Mesaj boş olamaz.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "https://localhost:7154/api/Mesajlar/MesajGonder",
      null,
      {
        params: {
          talepId: talep.id,
          icerik: yeniMesaj
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setMesaj("Mesaj başarıyla gönderildi.");
    setYeniMesaj("");

    MesajlariGetir();

  } catch (err) {
    console.log(err.response);
    setHata(
      err.response?.data || "Mesaj gönderilemedi."
    );
  }
};




  return (
    <div className="container col-md-6 mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4>Talep Detayı</h4>

        </div>
       <div className="card-body">
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

{mesajlar.map((m) => (
  <div
    key={m.id}
    className={
      m.rol === "Admin"
        ? "border rounded p-3 mb-3 bg-light"
        : "border rounded p-3 mb-3"
    }
  >
    <p>
      <strong>{m.rol}:</strong> {m.icerik}
    </p>

    <small className="text-muted">
      {new Date(m.gonderilmeTarihi).toLocaleString("tr-TR")}
    </small>
  </div>
))}

{rol === "Admin" && (
  <>
    <h5>Yeni Mesaj</h5>

    <div className="form-group">
      <textarea
        className="form-control"
        rows="4"
        placeholder="Mesajınızı yazınız..."
        value={yeniMesaj}
        onChange={(e) => setYeniMesaj(e.target.value)}
      ></textarea>
    </div>

    <button
      className="btn btn-primary mb-3 mx-3"
      onClick={MesajGonder}
    >
      Mesaj Gönder
    </button>
  </>
)}
 

<button className='btn btn-warning mb-3 mx-3' onClick={TalepGuncelle}>Güncelle</button>

<button
  className="btn btn-secondary mb-3 mx-3"
  onClick={() =>
    navigate(rol === "Admin" ? "/admin-talep-yonetimi" : "/taleplerim")
  }
>
  Geri Dön
</button>

       </div>
      </div>
    </div>
  )
}

export default TalepDetay