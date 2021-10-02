using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace YouTubeProxy.Data {
    public class YoutubeMediaContext : DbContext {
        public YoutubeMediaContext(DbContextOptions<YoutubeMediaContext> options) : base(options) {
        }

        public DbSet<YoutubeMedia> YoutubeMedia { get; set; } = null!;

        [SuppressMessage("ReSharper", "VariableHidesOuterVariable")]
        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);
            builder.Entity<YoutubeMedia>(builder => {
                builder.Property(p => p.Id).ValueGeneratedNever();
                builder.HasKey(p => p.Id);
                //builder.OwnsOne(p => p.Track, builder => {
                //    builder.WithOwner().HasForeignKey("Id");
                //    builder.Property(p => p.Bpm).HasDefaultValue(128);
                //    builder.Property(p => p.FirstBeat).HasDefaultValue(0);
                //});
            });
        }

        public void Initialize() => YoutubeMediaContext.Initialize(this);
        public static void Initialize(YoutubeMediaContext context) {
            context.Database.EnsureCreated();
            //// Look for any students.
            //if (context.Tracks.Any()) {
            //    return; // DB has been seeded
            //}

            //var tracks = new Track[]
            //{
            //    new Track{Id = "2yPVGLQTukg", Bpm = 128, FirstBeat = 0},
            //};
            //foreach (var t in tracks) {
            //    context.Tracks.Add(t);
            //}
            //context.SaveChanges();


        }
    }
}