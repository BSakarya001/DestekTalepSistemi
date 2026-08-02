import React from 'react'
import {Link} from 'react-router-dom'

function SifremiUnuttum() {
  return (
   
    <div className="container  col-md-5 mt-5">
      <h1 className='text-center'>DESTEK TALEP SİSTEMİ</h1>
      <h3 className='text-center'>Şifremi Unuttum</h3>
      <form >
        <div className="form-group">
    <label htmlFor="exampleInputEmail1">E-posta Adresi</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
   </div>

     <button type='submit' className='btn btn-primary btn-block'>ŞİFRE SIFIRLAMA BAĞLANTISI GÖNDER</button>
     <div className='d-flex justify-content-between mt-3'>
           <span>Şifreni hatirladin mi?</span>
           <Link to='/'>Giriş Yap</Link>
          </div>
      </form>
    </div>
    
  )
}

export default SifremiUnuttum