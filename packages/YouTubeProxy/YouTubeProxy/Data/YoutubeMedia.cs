using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using JetBrains.Annotations;
using YoutubeExplode.Videos;

namespace YouTubeProxy.Data {
    public class YoutubeMedia {
        public YoutubeMedia(string author, string channelId, string description, TimeSpan duration, string id, string title, DateTimeOffset uploadDate, string url) {
            this.Author = author;
            this.ChannelId = channelId;
            this.Description = description;
            this.Duration = duration;
            this.Id = id;
            this.Title = title;
            this.UploadDate = uploadDate;
            this.Url = url;
        }

        public Track Track { get; set; }

        public string Author  { get; private set; }

        public string ChannelId  { get; private set; }

        public string Description  { get; private set; }

        //[JsonConverter(typeof(JsonStandardTimeSpanConverter))]
        public TimeSpan Duration  { get; private set; }

        //public Engagement Engagement  { get; private set; }

        public string Id  { get; private set; }

        //public IReadOnlyList<string> Keywords  { get; private set; }


        public string Title  { get; private set; }

        public DateTimeOffset UploadDate  { get; private set; }

        public string Url { get; private set; }

        public static implicit operator YoutubeMedia(Video video) {
            return new YoutubeMedia(video.Author, video.ChannelId, video.Description, video.Duration, video.Id, video.Title, video.UploadDate, video.Url);
        }

        
    }
}