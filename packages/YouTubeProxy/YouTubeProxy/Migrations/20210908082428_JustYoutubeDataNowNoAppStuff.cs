using Microsoft.EntityFrameworkCore.Migrations;

namespace YouTubeProxy.Migrations
{
    public partial class JustYoutubeDataNowNoAppStuff : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Track_Bpm",
                table: "YoutubeMedia");

            migrationBuilder.DropColumn(
                name: "Track_FirstBeat",
                table: "YoutubeMedia");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Track_Bpm",
                table: "YoutubeMedia",
                type: "real",
                nullable: false,
                defaultValue: 128f);

            migrationBuilder.AddColumn<double>(
                name: "Track_FirstBeat",
                table: "YoutubeMedia",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
