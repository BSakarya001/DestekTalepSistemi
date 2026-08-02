using DestakTalepApı.Data;
using DestakTalepApı.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;


namespace DestakTalepApı.Controllers { 
    [ApiController][Route("api/[controller]")]


    public class KullanicilarController : ControllerBase
{
    private readonly UygulamaDbContext _context;
    public KullanicilarController(UygulamaDbContext context)
        {
        _context = context;


    }

        [HttpPost("KayitOl")]
        public IActionResult KayitOl(Kullanici kullanici)
        {
            _context.Kullanicilar.Add(kullanici);
            _context.SaveChanges();
            return Ok("Kullanıcı başarıyla kaydedildi. ");
        }
        [HttpPost("GirisYap")]
        public IActionResult GirisYap(Kullanici kullanici)
        {
            var bulunanKullanici = _context.Kullanicilar.FirstOrDefault(x =>
                x.Eposta == kullanici.Eposta && x.Sifre == kullanici.Sifre);
            if (bulunanKullanici == null)
            {
                return BadRequest("E-posta veya şifre hatalı.");
            }
            return Ok(bulunanKullanici);
        }








}

}