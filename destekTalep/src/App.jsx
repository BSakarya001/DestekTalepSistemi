import './App.css'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom'
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

import SifreSifirlama from './Pages/SifreSifirlama';

import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <div>
      <Navbar />

      <Routes>

        {/* Herkese açık sayfalar */}
        <Route path='/' element={<Giris />} />
        <Route path='/kayit' element={<KayitOl />} />
        <Route path='/eposta-dogrulama' element={<EpostaDogrulama />} />
        <Route path='/sifremi-unuttum' element={<SifremiUnuttum />} />
        <Route path='/sifre-sifirlama' element={<SifreSifirlama />} />

        {/* Kullanıcı giriş kontrolü gereken sayfalar */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <KullaniciPaneli />
            </ProtectedRoute>
          }
        />

        <Route
          path='/taleplerim'
          element={
            <ProtectedRoute>
              <Taleplerim />
            </ProtectedRoute>
          }
        />

        <Route
          path='/talep-olustur'
          element={
            <ProtectedRoute>
              <TalepOlustur />
            </ProtectedRoute>
          }
        />

        <Route
          path='/talep-detay/:id'
          element={
            <ProtectedRoute>
              <TalepDetay />
            </ProtectedRoute>
          }
        />

        {/* Admin sayfaları */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path='/kullanicilar'
          element={
            <ProtectedRoute>
              <KullaniciYonetimi />
            </ProtectedRoute>
          }
        />

        <Route
          path='/admin-talep-yonetimi'
          element={
            <ProtectedRoute>
              <AdminTalepTonetimi />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />
    </div>
  )
}

export default App