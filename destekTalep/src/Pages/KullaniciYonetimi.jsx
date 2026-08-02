import React from 'react'

function KullaniciYonetimi() {
  return (
   <div className="container mt-5">
    <h2 className='text-center mb-5'>Kullanıcı Yönetimi</h2>
    <p className='text-muted text-center mb-4'>Sistemde kayıtlı kullanıcıları buradan yönetebilirsiniz.</p>
    <div className='table-responsive'>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
           <th>ID</th>
           <th>Ad Soyad</th>
           <th>E-posta</th>
           <th>Rol</th>
           <th>Durum</th>
           <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>Ahmet Yılmaz</td>
          <td>ahmet@gmail.com</td>
          <td>Kullanıcı</td>
          <td className="text-success">Aktif</td>
          <td>
          <button className='btn btn-warning btn-sm mr-2'>Düzenle</button>
          <button className='btn btn-danger btn-sm'>Sil</button>
          </td>
        </tr>
        <tr>
           <td>2</td>
          <td>Ayşe Demir</td>
          <td>ayse@gmail.com</td>
          <td>Kullanıcı</td>
          <td className="text-success">Aktif</td>
          <td>
          <button className='btn btn-warning btn-sm mr-2'>Düzenle</button>
          <button className='btn btn-danger btn-sm'>Sil</button>
          </td>
        </tr>

<tr>
           <td>3</td>
          <td>Mehmet Kaya</td>
          <td>mehmet@gmail.com</td>
          <td>Admin</td>
          <td className="text-success">Aktif</td>
          <td>
          <button className='btn btn-warning btn-sm mr-2'>Düzenle</button>
         
          </td>
        </tr>

        </tbody>
      </table>
    </div>






   </div>
  )
}

export default KullaniciYonetimi