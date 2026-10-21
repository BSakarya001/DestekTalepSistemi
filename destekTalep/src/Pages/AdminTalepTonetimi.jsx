import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminTalepTonetimi() {
const [talepler,setTalepler]=useState([]);
const [hata,setHata]=useState("");
 const [mesaj,setMesaj]=useState("");

const navigate=useNavigate();

const [arama,setArama]=useState("");
const [durum,setDurum]=useState("");
const [oncelik,setOncelik]=useState("");
const [sayfa,setSayfa]=useState(1);
const kayitSayisi=5;


useEffect(()=>
  {
  TumTalepleriGetir();

},[]);

useEffect(() => {
  const kullanici=JSON.parse(localStorage.getItem("kullanici"));

  if(!kullanici || kullanici.rol !=="Admin"){
    setHata("Bu sayfaya erişim yetkiniz yok!");
   setTimeout(() =>{
      navigate('/');
    },1000);
  }
},[navigate]);

useEffect(() => {
  setSayfa(1);
},[arama, durum, oncelik]);

const TumTalepleriGetir = async () => 

  {
    setHata("");
  try{
    const token=localStorage.getItem("token");
    const cevap= await
    axios.get("https://localhost:7154/api/Talepler/TumTalepleriGetir",
      {
        headers:{
          Authorization:`Bearer ${token}`

        }
      });


   console.log(cevap.data.map(x => x.durum));

    setTalepler(cevap.data);

    
  }catch{
    setHata("Talepler getirilemedi!");
  }
};



const DurumDegistir = async (talep,yeniDurum) =>{

  setHata("");
  setMesaj("");
  try{
    const token=localStorage.getItem("token");
    console.log({
  ...talep,
  durum: yeniDurum
});
    await axios.put(`https://localhost:7154/api/Talepler/TalepGuncelle/${talep.id}`,
      {...talep,
        durum:yeniDurum
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );
     setMesaj("Durum güncellendi.");
    TumTalepleriGetir();
   
  }
  catch{
    setHata("Durum güncellenmedi.");
  }
};

const filtrelenmisTalepler = talepler.filter((talep) =>
 
  {
  const aramaUygun =
    talep.id.toString().includes(arama) ||
    talep.urunAdi.toLowerCase().includes(arama.toLowerCase());

  const durumUygun =
    durum === "" || talep.durum.trim() === durum.trim();

  const oncelikUygun =
    oncelik === "" || talep.oncelik === oncelik;

  return aramaUygun && durumUygun && oncelikUygun;
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
   <div className="container mt-5">
    <h2 className='text-center mb-5'>İade Talep Yönetimi</h2>

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




    <button type='button'className='btn btn-primary mb-3 ' onClick={() => navigate('/admin')}>Geri Dön</button>



    <p className='text-center text-muted mb-4'>Sistemde oluşturulan tüm iade taleplerini buradan yönetebilirsiniz.</p>
      <div className='row mb-4'>
        <div className='col-md-4'>
    <div className="form-group">
        <label htmlFor="arama">Talep Ara</label>
        <input type='text' className='form-control' id='arama' placeholder='Talep No veya Ürün Ara...' value={arama}  onChange={(e) =>
          setArama(e.target.value)
        }/>
    </div>
    </div>

    <div className='col-md-3'>
      <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Durum</label>
    <select className="form-control" id="exampleFormControlSelect1" value={durum} onChange={(e) => setDurum(e.target.value)}>
      <option value="">Tümü</option>
      <option value="Bekliyor">Bekliyor</option>
      <option value="Onaylandı">Onaylandı</option>
      <option value="Reddedildi">Reddedildi</option>
      
    </select>
  </div>
  </div>

    <div className='col-md-3'>
      <div className="form-group">
    <label htmlFor="exampleFormControlSelect1">Öncelik</label>
    <select className="form-control" id="exampleFormControlSelect1" value={oncelik} onChange={(e) => setOncelik(e.target.value)}>
      <option value="">Tümü</option>
      <option value="Düşük">Düşük</option>
      <option value="Orta">Orta</option>
      <option value="Yüksek">Yüksek</option>
    </select>
  </div>
  </div>

  <div className="col-md-2 d-flex align-items-end">
  <small className="text-muted mb-4">
    Filtreler otomatik uygulanır.
  </small>
</div>
  </div>
       <div className='table-responsive'>
       <table className="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">Talep No</th>
      <th scope="col">Kullanıcı</th>
      <th scope="col">Sipariş No</th>
      <th scope="col">Ürün</th>
      <th scope="col">İade Nedeni</th>
      <th scope="col">Öncelik</th>
      <th scope="col">Durum</th>
      <th scope="col">Tarih</th>
      <th scope="col">İşlem</th>
    </tr>
  </thead>
<tbody>
  {gosterilecekTalepler.map((talep) => (
    <tr key={talep.id}>
      <td>{talep.id}</td>
      <td>{talep.kullaniciId}</td>
      <td>{talep.siparisNo}</td>
      <td>{talep.urunAdi}</td>
      <td>{talep.iadeNedeni}</td>
      <td>{talep.oncelik}</td>
      <td>{talep.durum}</td>
      <td>{new Date(talep.olusturmaTarihi).toLocaleDateString("tr-TR")}</td>

      <td>
        <button
          className="btn btn-primary btn-sm mr-2"
          onClick={() => navigate("/talep-detay/" + talep.id)}
        >
          İncele
        </button>

        <button
          className="btn btn-success btn-sm mr-2"
          onClick={() => DurumDegistir(talep, "Onaylandı")}
        >
          Onayla
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => DurumDegistir(talep, "Reddedildi")}
        >
          Reddet
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

export default AdminTalepTonetimi