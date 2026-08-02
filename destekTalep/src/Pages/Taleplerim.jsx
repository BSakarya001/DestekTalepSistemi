import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Taleplerim() {
    const [talepler,setTalepler]=useState([]);
    useEffect(() => {
      TumTalepleriGetir();
    },[]);

    const TumTalepleriGetir = async() => {
    
      try{
        const cevap=await axios.get("https://localhost:7154/api/Talepler/TumTalepleriGetir");
        setTalepler(cevap.data);
      }catch{
        alert("Talepler getirilemedi!");
      }

    };
     
    const navigate=useNavigate();

    const TalepSil = async (id) => {
      if(!window.confirm("Bu talebi silmek istediğinize emin misiniz?")){
        return;
      }
      try{
        await axios.delete("https://localhost:7154/api/Talepler/TalepSil/" + id);
        alert("Talep başarıyla silindi!");
        TumTalepleriGetir();
      }
      catch{
        alert("Talep silinemedi!");
      }
    };

   const [arama,setArama]=useState("");
   const [durum,setDurum]=useState("");






  return (
   <div className="container  mt-5">
    <h2 className='mb-4 text-center'>İade Taleplerim</h2>
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
    <small className="text-mutex">Filtreler otomatik uygulanır.</small>
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
{
   talepler
.filter((talep) => {
  const aramaUygun =
    talep.id.toString().includes(arama) ||
    talep.urunAdi.toLowerCase().includes(arama.toLowerCase());

  const durumUygun =
    durum === "" || talep.durum.trim() === durum.trim();

  return aramaUygun && durumUygun;
})
.map((talep) => (
        <tr key={talep.id}>
            <td>{talep.id}</td>
            <td>{talep.siparisNo}</td>
            <td>{talep.urunAdi}</td>
            <td>{talep.iadeNedeni}</td>
            <td>{talep.durum}</td>
            <td>{talep.olusturmaTarihi}</td>
            <td>
<button className="btn btn-primary btn-sm mx-1" onClick={() => navigate("/talep-detay/" + talep.id)}>
                    Detay
                </button>
<button className="btn btn-danger btn-sm mx-1" onClick={() =>TalepSil( talep.id)}>
                    Sil
                </button>
            </td>
        </tr>
    ))
}
</tbody>
</table>
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
   
</div>









  )
}

export default Taleplerim