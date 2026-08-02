import React from 'react'
import { Link } from 'react-router-dom'

function EpostaDogrulama() {
  return (
   <div className="container col-md-5 mt-5">
    <h2 className='text-center mb-4'>E-posta Doğrulama </h2>
    <p className='text-center mb-4 text-muted'>E-posta adresinize gönderilen doğrulama kodunu giriniz.</p>
     <form >
       <div className="form-group">
    <label htmlFor="exampleFormControlInput1">Doğrulama Kodu</label>
<input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Doğrulama Kodunu Giriniz"/>
  </div>

  <button className="btn btn-primary btn-block" type="submit">Doğrula</button>

  <button className="btn btn-secondary btn-block mt-2 " type="button">Kodu Tekrar Gönder</button>

  <div className="text-center mt-3">
    <Link to='/'>Giriş Sayfasına Dön</Link>
  </div>


     
     </form>

   
   </div>
  )
}

export default EpostaDogrulama