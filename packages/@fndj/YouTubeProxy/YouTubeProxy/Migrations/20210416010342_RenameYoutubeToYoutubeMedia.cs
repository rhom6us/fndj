using Microsoft.EntityFrameworkCore.Migrations;

namespace YouTubeProxy.Migrations
{
    public partial class RenameYoutubeToYoutubeMedia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Youtube",
                table: "Youtube");

            migrationBuilder.RenameTable(
                name: "Youtube",
                newName: "YoutubeMedia");

            migrationBuilder.AddPrimaryKey(
                name: "PK_YoutubeMedia",
                table: "YoutubeMedia",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_YoutubeMedia",
                table: "YoutubeMedia");

            migrationBuilder.RenameTable(
                name: "YoutubeMedia",
                newName: "Youtube");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Youtube",
                table: "Youtube",
                column: "Id");
        }
    }
}
