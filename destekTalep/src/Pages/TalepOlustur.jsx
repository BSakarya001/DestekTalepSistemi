import React,{useState} from 'react'
import axios from 'axios'



function TalepOlustur() {
const[iadeNedeni,setIadeNedeni]=useState("");
const[aciklama,setAciklama]=useState("");
const [siparisNo,setSiparisNo]=useState("");
const [urunAdi,setUrunAdi]=useState("");
const[baslik,setBaslik]=useState("");
const [kategori, setKategori]=useState("");
const [oncelik, setOncelik]=useState("Orta");

const TalepOlustur = async () => {
  try {
    await axios.post("https://localhost:7154/api/Talepler/TalepOlustur", {
      siparisNo: siparisNo,
      urunAdi: urunAdi,
      aciklama: aciklama,
      iadeNedeni: iadeNedeni,
       baslik:baslik,
       kategori:kategori,
       oncelik:oncelik,


      kullaniciId: 1
    });

    alert("Talep başarıyla oluşturuldu!");
  }
  catch {
    alert("Talep oluşturulamadı!");
  }
};








  return (
    <div className="container col-md-6 mt-5">

      <h2 className="text-center mb-4">İade Talebi Oluştur</h2>

      <form>
        <div className="form-group mb-3">
  <label>Başlık</label>
  <input
    type="text"
    className="form-control"
    value={baslik}
    onChange={(e) => setBaslik(e.target.value)}
    placeholder="Başlık giriniz"
  />
</div>

        <div className="form-group mb-3">
          <label htmlFor="siparisNo">Sipariş Numarası</label>
          <input
            type="text"
            className="form-control"
           value={siparisNo} onChange={(e)=>setSiparisNo(e.target.value)}
            placeholder="Sipariş numarasını giriniz"
          />
        </div>
        <div className="form-group mb-3">
  <label htmlFor="urunAdi">Ürün Adı</label>
  <input
    type="text"
    className="form-control"
    id="urunAdi"
    value={urunAdi}
    onChange={(e) => setUrunAdi(e.target.value)}
    placeholder="Ürün adını giriniz"
  />
</div>


        <div className="form-group mb-3">
          <label htmlFor="neden">İade Nedeni</label>
          <select className="form-control" id="neden" value={iadeNedeni} onChange={(e)=>setIadeNedeni(e.target.value)}   >
            <option value="">Seçiniz</option>
            <option>Hasarlı Ürün</option>
            <option>Yanlış Ürün</option>
            <option>Eksik Ürün</option>
            <option>Ürünü Beğenmedim</option>
            <option>Diğer</option>
          </select>
        </div>
<div className="form-group mb-3">
  <label>Kategori</label>
  <select
    className="form-control"
    value={kategori}
    onChange={(e) => setKategori(e.target.value)}
  >
    <option value="">Seçiniz</option>
    <option>Elektronik</option>
    <option>Giyim</option>
    <option>Ev & Yaşam</option>
    <option>Diğer</option>
  </select>
</div>
<div className="form-group mb-3">
  <label>Öncelik</label>
  <select
    className="form-control"
    value={oncelik}
    onChange={(e) => setOncelik(e.target.value)}
  >
    <option>Düşük</option>
    <option>Orta</option>
    <option>Yüksek</option>
  </select>
</div>









       <div className="form-group mb-3">
  <label htmlFor="aciklama">Açıklama</label>

  <textarea
    className="form-control"
    id="aciklama"
    rows="4"
    value={aciklama}
    onChange={(e)=>setAciklama(e.target.value)}
    placeholder="İade nedeninizi açıklayınız"
  ></textarea>
</div>

       

        <button type="button" className="btn btn-primary w-100" onClick={TalepOlustur}>
          İade Talebi Oluştur
        </button>

      </form>

    </div>
  )
}

export default TalepOlustur