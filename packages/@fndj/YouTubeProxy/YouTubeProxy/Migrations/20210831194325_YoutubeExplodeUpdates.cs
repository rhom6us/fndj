using Microsoft.EntityFrameworkCore.Migrations;

namespace YouTubeProxy.Migrations
{
    public partial class YoutubeExplodeUpdates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChannelId",
                table: "YoutubeMedia");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ChannelId",
                table: "YoutubeMedia",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
