using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlizzardWebApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexToGroupMember : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_GroupMember_GroupId",
                table: "GroupMember",
                column: "GroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GroupMember_GroupId",
                table: "GroupMember");
        }
    }
}
