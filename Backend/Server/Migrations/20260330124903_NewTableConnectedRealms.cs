using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlizzardWebApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class NewTableConnectedRealms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Realm");

            migrationBuilder.CreateTable(
                name: "RealmDb",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Slug = table.Column<string>(type: "TEXT", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    CRealmsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RealmDb", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RealmDb_ConnectedRealms_CRealmsId",
                        column: x => x.CRealmsId,
                        principalTable: "ConnectedRealms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RealmDb_CRealmsId",
                table: "RealmDb",
                column: "CRealmsId");

            migrationBuilder.CreateIndex(
                name: "IX_RealmDb_Name",
                table: "RealmDb",
                column: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RealmDb");

            migrationBuilder.CreateTable(
                name: "Realm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CRealmsId = table.Column<int>(type: "INTEGER", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Slug = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Realm", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Realm_ConnectedRealms_CRealmsId",
                        column: x => x.CRealmsId,
                        principalTable: "ConnectedRealms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Realm_CRealmsId",
                table: "Realm",
                column: "CRealmsId");

            migrationBuilder.CreateIndex(
                name: "IX_Realm_Name",
                table: "Realm",
                column: "Name");
        }
    }
}
