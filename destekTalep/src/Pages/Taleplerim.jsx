import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Taleplerim() {
  const navigate = useNavigate();
    const [talepler,setTalepler]=useState([]);
    const [hata,setHata]=useState("");
     const [mesaj,setMesaj]=useState("");

    const [arama,setArama]=useState("");
const [durum,setDurum]=useState("");

const [sayfa,setSayfa] = useState(1);
const kayitSayisi = 5;
    useEffect(() => {
      TumTalepleriGetir();
    },[]);

    const TumTalepleriGetir = async() => {
      setHata("");
      setMesaj("");
    
      try{
        const token=localStorage.getItem("token");
        const cevap=await axios.get("https://localhost:7154/api/Talepler/TumTalepleriGetir",
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        const kullanici=JSON.parse(localStorage.getItem("kullanici"));
       const benimTaleplerim=cevap.data.filter(x=>x.kullaniciId === kullanici.id);
  setTalepler(benimTaleplerim);
    }
  catch{
    setHata("Talepler getirilemedi!");
  }};
     
   

    const TalepSil = async (id) => {
      if(!window.confirm("Bu talebi silmek istediğinize emin misiniz?")){
        return;
      }
        setHata("");
      setMesaj("");

      try{
        const token=localStorage.getItem("token");
        await axios.delete("https://localhost:7154/api/Talepler/TalepSil/" + id,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
       setMesaj("Talep başarıyla silindi!");
        TumTalepleriGetir();
      }
      catch{
        setHata("Talep silinemedi!");
      }
    };

 
 


    const filtrelenmisTalepler = talepler.filter((talep) => {

  const aramaUygun =
    talep.id.toString().includes(arama) ||
    talep.urunAdi.toLowerCase().includes(arama.toLowerCase());

  const durumUygun =
    durum === "" || talep.durum.trim() === durum.trim();

  return aramaUygun && durumUygun;
});

const sonIndex = sayfa * kayitSayisi;
const ilkIndex = sonIndex - kayitSayisi;

const gosterilecekTalepler = filtrelenmisTalepler.slice(
  ilkIndex,
  sonIndex
);

const toplamSayfa = Math.max(
  1,
  Math.ceil(filtrelenmisTalepler.length / kayitSayisi)
);







  return (
   <div className="container  mt-5">
    <h2 className='mb-4 text-center'>İade Taleplerim</h2>

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



    <div className="row mb-4">

  <div className="col-md-6 mb-2">
    <input
      type="text"
      className="form-control"
      placeholder="Talep No veya Ürün Adı Ara..." value={arama} onChange={(e) => setArama(e.target.value)}
    />
  </div>

  <div className="col-md-3 mb-2">
    <select className="form-control" value={durum} onChange={(e) => setDurum(e.target.value)}>
      <option value="">Tüm Durumlar</option>
      <option value="Bekliyor">Bekliyor</option>
      <option value="Onaylandı">Onaylandı</option>
      <option value="Reddedildi">Reddedildi</option>
    </select>
  </div>

  <div className="col-md-3 mb-2">
    <small className="text-muted">Filtreler otomatik uygulanır.</small>
  </div>

</div>
    <div className='table-responsive'>
         <table className="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">Talep No</th>
      <th scope="col">Sipariş No</th>
      <th scope="col">Ürün Adi</th>
      <th scope="col">İade Nedeni </th>
      <th scope="col">Durum</th>
      <th scope="col">Tarih</th>
      <th scope="col">İşlem</th>
      
    </tr>
  </thead>
 <tbody>
  {gosterilecekTalepler.map((talep) => (
    <tr key={talep.id}>
      <td>{talep.id}</td>
      <td>{talep.siparisNo}</td>
      <td>{talep.urunAdi}</td>
      <td>{talep.iadeNedeni}</td>
      <td>{talep.durum}</td>
      <td>
        {new Date(talep.olusturmaTarihi).toLocaleDateString("tr-TR")}
      </td>

      <td>
        <button
          className="btn btn-primary btn-sm mx-1"
          onClick={() => navigate("/talep-detay/" + talep.id)}
        >
          Detay
        </button>

        <button
          className="btn btn-danger btn-sm mx-1"
          onClick={() => TalepSil(talep.id)}
        >
          Sil
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>

        </div>
        <nav className="mt-4">
  <ul className="pagination justify-content-center">
   <li className={sayfa === 1 ? "page-item disabled" : "page-item"}>
 <button
  className="page-link"
  onClick={() => setSayfa(Math.max(sayfa - 1, 1))}
>
  Önceki
</button>
</li>

  {[...Array(toplamSayfa)].map((_, index) => (
  <li
    key={index}
    className={sayfa === index + 1 ? "page-item active" : "page-item"}
  >
    <button
      className="page-link"
      onClick={() => setSayfa(index + 1)}
    >
      {index + 1}
    </button>
  </li>
))}
<li
  className={
    sayfa === toplamSayfa ? "page-item disabled" : "page-item"
  }
>
  <button
  className="page-link"
  onClick={() => setSayfa(Math.min(sayfa + 1, toplamSayfa))}
>
  Sonraki
</button>
</li>
  </ul>
</nav>
   
 </div>
   










  )
}

export default Taleplerim