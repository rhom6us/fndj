using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace YouTubeProxy.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Youtube",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Track_Bpm = table.Column<float>(type: "real", nullable: false, defaultValue: 128f),
                    Track_FirstBeat = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ChannelId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "time", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UploadDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Youtube", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Youtube");
        }
    }
}
