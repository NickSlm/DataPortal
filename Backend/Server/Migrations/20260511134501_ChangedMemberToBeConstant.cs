using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlizzardWebApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangedMemberToBeConstant : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupMember_Member_MemberId",
                table: "GroupMember");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMember_Member_MemberId",
                table: "GroupMember",
                column: "MemberId",
                principalTable: "Member",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupMember_Member_MemberId",
                table: "GroupMember");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMember_Member_MemberId",
                table: "GroupMember",
                column: "MemberId",
                principalTable: "Member",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
