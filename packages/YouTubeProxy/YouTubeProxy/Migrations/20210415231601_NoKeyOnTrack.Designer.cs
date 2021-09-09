﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using YouTubeProxy.Data;

namespace YouTubeProxy.Migrations
{
    [DbContext(typeof(YoutubeMediaContext))]
    [Migration("20210415231601_NoKeyOnTrack")]
    partial class NoKeyOnTrack
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("YouTubeProxy.Data.Youtube", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ChannelId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan>("Duration")
                        .HasColumnType("time");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTimeOffset>("UploadDate")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Youtube");
                });

            modelBuilder.Entity("YouTubeProxy.Data.Youtube", b =>
                {
                    b.OwnsOne("YouTubeProxy.Data.Track", "Track", b1 =>
                        {
                            b1.Property<string>("YoutubeId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<float>("Bpm")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("real")
                                .HasDefaultValue(128f);

                            b1.Property<double>("FirstBeat")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("float")
                                .HasDefaultValue(0.0);

                            b1.HasKey("YoutubeId");

                            b1.ToTable("Youtube");

                            b1.WithOwner()
                                .HasForeignKey("YoutubeId");
                        });

                    b.Navigation("Track")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
