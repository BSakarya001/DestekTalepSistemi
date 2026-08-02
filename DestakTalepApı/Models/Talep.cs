namespace DestakTalepApı.Models
{
    public class Talep
    {
      public int Id { get; set; }
       
        public string Aciklama { get; set; } = string.Empty;
        public string Durum {  get; set; } = "Bekliyor";
        public DateTime OlusturmaTarihi { get; set; }=DateTime.Now;

        public int KullaniciId {  get; set; }

        public string SiparisNo { get; set; } = string.Empty;
        public string UrunAdi { get; set; } = string.Empty;
        public string IadeNedeni { get; set;} = string.Empty;
        public string Baslik { get; set; }=string.Empty;
        public string Kategori { get; set; } = string.Empty;
        public string Oncelik { get; set; } = "Orta";





    }
}
