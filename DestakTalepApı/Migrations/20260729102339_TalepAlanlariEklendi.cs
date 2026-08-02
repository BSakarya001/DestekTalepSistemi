using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DestakTalepApı.Migrations
{
    /// <inheritdoc />
    public partial class TalepAlanlariEklendi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlusturmaTarihi",
                table: "Talepler",
                newName: "OlusturmaTarihi");

            migrationBuilder.AddColumn<string>(
                name: "IadeNedeni",
                table: "Talepler",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SiparisNo",
                table: "Talepler",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UrunAdi",
                table: "Talepler",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IadeNedeni",
                table: "Talepler");

            migrationBuilder.DropColumn(
                name: "SiparisNo",
                table: "Talepler");

            migrationBuilder.DropColumn(
                name: "UrunAdi",
                table: "Talepler");

            migrationBuilder.RenameColumn(
                name: "OlusturmaTarihi",
                table: "Talepler",
                newName: "PlusturmaTarihi");
        }
    }
}
