import React from 'react'

function KullaniciPaneli() {
  return (
    <div className="container mt-5">
      <h2 className='mb-4'>Hoş Geldiniz,Admin </h2>
      <h5 className='mb-5'>Bugünkü Durum</h5>
      <div className="row mb-5">

        <div className="col-md-3 text-primary">
          <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Toplam İade </h5>
              <h2 className='fw-bold'>25</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 text-warning">
          <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Bekleyen İadeler</h5>
              <h2 className='fw-bold'>8</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 text-success">
        <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Onaylanan İadeler</h5>
              <h2 className='fw-bold'>15</h2>
            </div>
          </div>

        </div>
        <div className="col-md-3 text-danger">
          <div className="card">
            <div className="card-body">
              <h5 className='card-title'>Reddedilen İadeler</h5>
              <h2 className='fw-bold'>2</h2>
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
    <tr>
      <th scope="row">1</th>
      <td>SP1001</td>
      <td>Kablosuz Mouse</td>
      <td>Beklemede</td>
      <td>22.07.2026</td>

    </tr>
    <tr>
      <th scope="row">2</th>
      <td>SP1002</td>
      <td>Klavye</td>
      <td>Onaylandı</td>
      <td>21.07.2026</td>
    </tr>
    <tr>
      <th scope="row">3</th>
       <td>SP1003</td>
      <td>Kulaklık</td>
      <td>Reddedildi</td>
      <td>20.07.2026</td>
    </tr>
 
     
    
  </tbody>
</table>
       </div>
     



    </div>
  )
}

export default KullaniciPaneli