import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom'
import Footer from './components/Footer';


import Giris from './Pages/Giris';
import KayitOl from './Pages/KayitOl';
import EpostaDogrulama from './Pages/EpostaDogrulama';
import SifremiUnuttum from './Pages/SifremiUnuttum';
import KullaniciPaneli from './Pages/KullaniciPaneli';
import Taleplerim from './Pages/Taleplerim';
import TalepOlustur from './Pages/TalepOlustur';
import TalepDetay from './Pages/TalepDetay';
import AdminPanel from './Pages/AdminPanel';

import KullaniciYonetimi from './Pages/KullaniciYonetimi';
import AdminTalepTonetimi from './Pages/AdminTalepTonetimi';





function App() {
  
  return (

    <div>
       <Navbar />
        <Routes>
             <Route path='/' element={<Giris />} />
             <Route path='/kayit' element={<KayitOl />} />
             <Route path='/eposta-dogrulama' element={<EpostaDogrulama />} />
             <Route path='/sifremi-unuttum' element={<SifremiUnuttum />} />
             <Route path='/dashboard' element={<KullaniciPaneli />} />
             <Route path='/taleplerim' element={<Taleplerim />} />
             <Route path='/talep-olustur' element={<TalepOlustur/>} />
             <Route path='/talep-detay/:id' element={<TalepDetay />} />
             <Route path='/admin' element={<AdminPanel/>} />
             <Route path='/kullanicilar' element={<KullaniciYonetimi/>} />
            <Route path='/admin-talep-yonetimi' element={<AdminTalepTonetimi/>}/>
  </Routes>
      <Footer/>


    </div>
  )
  
}

export default App
