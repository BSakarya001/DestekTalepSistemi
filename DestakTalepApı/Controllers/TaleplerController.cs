using DestakTalepApı.Data;
using DestakTalepApı.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;



namespace DestakTalepApı.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
 public class TaleplerController:ControllerBase
    {
        private readonly UygulamaDbContext _content;
        public TaleplerController(UygulamaDbContext content)
        {
            _content = content;
        }
        [HttpPost("TalepOlustur")]
        public IActionResult TalepOlustur(Talep talep)
        {
            _content.Talepler.Add(talep);
            _content.SaveChanges();
            return Ok("Talep başarıyla oluşturuldu.");
        }
        [HttpGet("TumTalepleriGetir")] 
        public IActionResult TumTalepleriGetir()
        {
            var talepler= _content.Talepler.ToList();
            return Ok(talepler);
        }
        [HttpGet("TalepDetay/{id}")]
        public IActionResult TalepDetay(int id)
        {
            var talep = _content.Talepler.FirstOrDefault(x => x.Id == id);
            if (talep == null)
            {
                return NotFound("Talep bulunamadı.");
            }
            return Ok(talep);
        }
        [HttpPut("TalepGuncelle/{id}")]
        public IActionResult TalepGuncelle(int id,Talep guncelTalep)
        {
            var talep= _content.Talepler.FirstOrDefault(x
                =>x.Id == id);
            if(talep == null)
            {
                return NotFound("Talep bulunamadı.");
            }
            talep.Baslik = guncelTalep.Baslik;
            talep.Kategori = guncelTalep.Kategori;

            
            talep.Aciklama=guncelTalep.Aciklama;
            talep.Durum=guncelTalep.Durum;
            talep.KullaniciId=guncelTalep.KullaniciId;
            talep.SiparisNo=guncelTalep.SiparisNo;
            talep.UrunAdi=guncelTalep.UrunAdi;
            talep.IadeNedeni=guncelTalep.IadeNedeni;
            talep.Oncelik=guncelTalep.Oncelik;



            _content.SaveChanges();
            return Ok("Talep başarıyla güncellendi.");
        }
        [HttpDelete("TalepSil/{id}")]
        public IActionResult TalepSil(int id)
        {
            var talep = _content.Talepler.FirstOrDefault(x
                => x.Id == id);
            if( talep == null)
            {
                return NotFound("Talep bulunamadı.");
            }
         _content.Talepler.Remove(talep);
            _content.SaveChanges();
            return Ok("Talep başarıyla silindi");
        }

    }
}
