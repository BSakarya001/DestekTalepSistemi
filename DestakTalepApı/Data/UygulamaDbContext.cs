using Microsoft.EntityFrameworkCore;
using DestakTalepApı.Models;

namespace DestakTalepApı.Data
{
    public class UygulamaDbContext:DbContext
    {
        public UygulamaDbContext(DbContextOptions<UygulamaDbContext> options) : base(options) { }
        public DbSet<Kullanici> Kullanicilar {  get; set; }
        public DbSet<Talep>Talepler { get; set; }

    }



}
