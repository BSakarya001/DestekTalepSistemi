using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DestakTalepApı.Migrations
{
    /// <inheritdoc />
    public partial class FotoğrafYoluEklendi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FotoğrafYolu",
                table: "Talepler",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FotoğrafYolu",
                table: "Talepler");
        }
    }
}
