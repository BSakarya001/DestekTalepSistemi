import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <Link className="navbar-brand" to="/">DESTEK TALEP</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto px-3">
      <li className="nav-item ">
        <Link className="nav-link" to='/dashboard'> Kullanıcı Paneli </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/talep-olustur">Talep Oluştur</Link>
      </li>
     <li className="nav-item">
        <Link className="nav-link"to="/taleplerim">Taleplerim</Link>
      </li>
      
</ul>
     <ul className='navbar-nav ml-auto'>
        <li className="nav-item">
        <Link className="nav-link"to="/">Çıkış Yap</Link>
      </li>
     </ul>


  </div>
</nav>

   </div>








  
  )
}

export default Navbar