using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlizzardWebApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeLeaderboardIdToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LeaderboardId",
                table: "KeystoneLeaderboards",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LeaderboardId",
                table: "KeystoneLeaderboards");
        }
    }
}
