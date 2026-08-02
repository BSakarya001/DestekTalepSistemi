import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminTalepTonetimi() {
const [talepler,setTalepler]=useState([]);

const navigate=useNavigate();

useEffect(()=>
  {
  TumTalepleriGetir();

},[]);

const TumTalepleriGetir = async () => 

  {
  try{
    const cevap= await
    axios.get("https://localhost:7154/api/Talepler/TumTalepleriGetir");
   console.log(cevap.data.map(x => x.durum));
    setTalepler(cevap.data);

    
  }catch{
    alert("Talepler getirilemedi!");
  }
};

const [arama,setArama]=useState("");
const [durum,setDurum]=useState("");
const [oncelik,setOncelik]=useState("");








  return (
   <div className="container mt-5">
    <h2 className='text-center mb-5'>İade Talep Yönetimi</h2>
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
  {talepler
.filter((talep) => {
  const aramaUygun =
    talep.id.toString().includes(arama) ||
    talep.urunAdi.toLowerCase().includes(arama.toLowerCase());

  const durumUygun =
    durum === "" || talep.durum.trim()=== durum.trim();

    const oncelikUygun=
    oncelik === "" || talep.oncelik === oncelik ;

  return aramaUygun && durumUygun && oncelikUygun;
})
.map((talep) => (
    <tr key={talep.id}>
      <td>{talep.id}</td>
      <td>{talep.kullaniciId}</td>
      <td>{talep.siparisNo}</td>
      <td>{talep.urunAdi}</td>
      <td>{talep.iadeNedeni}</td>
      <td>{talep.oncelik}</td>
      <td>{talep.durum} - {durum}</td>
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
  ))}
</tbody>
</table>

        </div>
        <nav className="mt-4">
  <ul className="pagination justify-content-center">
    <li className="page-item disabled">
      <a className="page-link" href="#">Önceki</a>
    </li>

    <li className="page-item active">
      <a className="page-link" href="#">1</a>
    </li>

    <li className="page-item">
      <a className="page-link" href="#">2</a>
    </li>

    <li className="page-item">
      <a className="page-link" href="#">Sonraki</a>
    </li>
  </ul>
</nav>
   </div>
  )
}

export default AdminTalepTonetimi