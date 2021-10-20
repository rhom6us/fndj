using System;
using YoutubeExplode.Videos;

namespace YouTubeProxy.Data
{
    // public class Thmubnail {
    //     public int Height { get; private set; }
    //     public int Width { get; private set; }
    //     public string Url { get; private set; }
    // }
    public class YoutubeMedia {
        public YoutubeMedia(string author, string description, TimeSpan duration, string id, string title, DateTimeOffset uploadDate, string url) {
            this.Author = author;
            this.Description = description;
            this.Duration = duration;
            this.Id = id;
            this.Title = title;
            this.UploadDate = uploadDate;
            this.Url = url;
        }
        //public IEnumerable<Thmubnail> Thmubnails { get; private set }
        //public IEnumerable<Thmubnail> Thmubnails { get; private set }
        //public Track Track { get; set; }



        //[JsonConverter(typeof(TimeSpanConverter))]


        //public Engagement Engagement  { get; private set; }

        public string Id { get; private set; }

        //public IReadOnlyList<string> Keywords  { get; private set; }


        public string Title  { get; private set; }
        public string Author { get; private set; }
        public DateTimeOffset UploadDate  { get; private set; }
        public string Description { get; private set; }
        public TimeSpan Duration { get; private set; }

        public string Url { get; private set; }

        public static implicit operator YoutubeMedia(Video video) {
            if(video.Duration == null) {
                throw new NotSupportedException("It looks like this is an ongoing livestream (duration is null). This is not currently supported.");
            }
            return new YoutubeMedia(video.Author.Title, video.Description, video.Duration.Value, video.Id, video.Title, video.UploadDate, video.Url);
        }


    }
}
