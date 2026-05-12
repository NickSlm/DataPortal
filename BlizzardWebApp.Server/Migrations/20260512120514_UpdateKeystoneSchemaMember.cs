using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlizzardWebApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateKeystoneSchemaMember : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Realm",
                table: "Member",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Realm",
                table: "Member");
        }
    }
}
