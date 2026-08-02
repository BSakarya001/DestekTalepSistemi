using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DestakTalepApı.Migrations
{
    /// <inheritdoc />
    public partial class AddBaslikKategoriOncelik : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FotoğrafYolu",
                table: "Talepler",
                newName: "Oncelik");

            migrationBuilder.AddColumn<string>(
                name: "Baslik",
                table: "Talepler",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Kategori",
                table: "Talepler",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Baslik",
                table: "Talepler");

            migrationBuilder.DropColumn(
                name: "Kategori",
                table: "Talepler");

            migrationBuilder.RenameColumn(
                name: "Oncelik",
                table: "Talepler",
                newName: "FotoğrafYolu");
        }
    }
}
