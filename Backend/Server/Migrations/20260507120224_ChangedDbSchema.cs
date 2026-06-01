using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlizzardWebApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangedDbSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KeystoneId",
                table: "KeystoneLeaderboards");

            migrationBuilder.DropColumn(
                name: "RealmId",
                table: "KeystoneLeaderboards");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KeystoneId",
                table: "KeystoneLeaderboards",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RealmId",
                table: "KeystoneLeaderboards",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
