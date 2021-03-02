using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using YoutubeExplode;
using YoutubeExplode.Channels;
using YoutubeExplode.Common;
using YoutubeExplode.Videos;
using YoutubeExplode.Videos.Streams;

namespace YouTubeProxy.Controllers {
    [ApiController]
    [Route("")]
    public class YoutubeController : ControllerBase {
        private static readonly string[] Summaries = {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching",
        };

        public YoutubeController(ILogger<YoutubeController> logger, YoutubeClient youtube) {
            _logger = logger;
            _youtube = youtube;
        }


        [HttpGet("{id}")]
        public async Task<VideoModel> Get(string id) {
            var video = await _youtube.Videos.GetAsync(id);
            var manifest = await _youtube.Videos.Streams.GetManifestAsync(id);
            //var link = this.Url.Action("Stream", new {id});

            var urls = new Dictionary<StreamType, string> {
                [StreamType.audio] = Url.Action("Stream", new {id, type = StreamType.audio}),
                [StreamType.video] = Url.Action("Stream", new {id, type = StreamType.video}),
                [StreamType.muxed] = Url.Action("Stream", new {id, type = StreamType.muxed}),
            };
            return new VideoModel(video, urls);
        }

        [HttpGet("{id}/{type}")]
        public async Task<IActionResult> Stream(string id, StreamType type) {
            var manifest = await _youtube.Videos.Streams.GetManifestAsync(id);

            IStreamInfo GetStream() {
                switch (type) {
                    case StreamType.audio:
                        return manifest.GetAudioOnly().WithHighestBitrate();
                    case StreamType.video:
                        return manifest.GetVideoOnly().WithHighestBitrate();
                    case StreamType.muxed:
                    default:
                        return manifest.GetMuxed().WithHighestBitrate();
                }
            }

            var streamInfo = GetStream();
            if (streamInfo == null)
                return this.NotFound(id);
            var stream = await _youtube.Videos.Streams.GetAsync(streamInfo);
            return base.File(stream, type == StreamType.audio ? "audio/mp3" : "video/mp4");
        }

        private readonly ILogger<YoutubeController> _logger;
        private readonly YoutubeClient _youtube;
    }
    public enum StreamType {
        audio,
        video,
        muxed,
    }
    public class StreamInfoModel {
        public StreamInfoModel(IStreamInfo streamInfoImplementation) {
            _streamInfoImplementation = streamInfoImplementation;
        }

        public int Tag => _streamInfoImplementation.Tag;

        //public string Url => _streamInfoImplementation.Url;

        //public string Container => _streamInfoImplementation.Container.Name;

        public long Size => _streamInfoImplementation.Size.TotalBytes;

        //public long Bitrate => _streamInfoImplementation.Bitrate.BitsPerSecond;
        private readonly IStreamInfo _streamInfoImplementation;
    }

    public class VideoModel {
        public Dictionary<StreamType, string> Stream { get; }

        public VideoModel(Video video, Dictionary<StreamType, string> stream) {
            this.Stream = stream;
            _video = video;
            //this.Streams = streams.GroupBy(p => p.Container, (key, models) => Grouping.Create(key, models.ToDictionary(p => p.Bitrate)));
            //this.Streams = streams.GroupBy(p => p.Container.Name).ToDictionary(p => p.Key, p => p.ToDictionary(q => q.Bitrate.BitsPerSecond, q => new StreamInfoModel(q)));
        }

        //public IEnumerable<Grouping<string, long, StreamInfoModel>> Streamss { get; }
        //public Dictionary<string, Dictionary<long, StreamInfoModel>> Streams { get; }
        public string Author => _video.Author;

        public string ChannelId => _video.ChannelId.Value;

        public string Description => _video.Description;

        public double Duration => _video.Duration.TotalMilliseconds;

        //public Engagement Engagement => _video.Engagement;

        public string Id => _video.Id.Value;

        //public IReadOnlyList<string> Keywords => _video.Keywords;

        public ThumbnailSet Thumbnails => _video.Thumbnails;

        public string Title => _video.Title;

        private static readonly DateTime epoch = new DateTime(1970, 1, 1);
        public double UploadDate => _video.UploadDate.Subtract(epoch).TotalMilliseconds;

        public string Url => _video.Url;

        internal static class Grouping {
            public static Grouping<TGroup, TKey, TElement> Create<TGroup, TKey, TElement>(TGroup group, IDictionary<TKey, TElement> items) {
                return new Grouping<TGroup, TKey, TElement>(group, items);
            }
        }
        public class Grouping<TGroup, TKey, TElement> : IGrouping<TGroup, KeyValuePair<TKey, TElement>>, IReadOnlyDictionary<TKey, TElement> {
            public Grouping(TGroup group, IDictionary<TKey, TElement> items) {
                this.Key = group;
                _items = new ReadOnlyDictionary<TKey, TElement>(items);
            }

            public TGroup Key { get; }

            public IEnumerator<KeyValuePair<TKey, TElement>> GetEnumerator() {
                return _items.GetEnumerator();
            }

            IEnumerator IEnumerable.GetEnumerator() {
                return ((IEnumerable) _items).GetEnumerator();
            }


            public int Count => _items.Count;


            public bool ContainsKey(TKey key) {
                return _items.ContainsKey(key);
            }


            public bool TryGetValue(TKey key, out TElement value) {
                return _items.TryGetValue(key, out value);
            }

            public TElement this[TKey key] => _items[key];
            public IEnumerable<TKey> Keys => _items.Keys;

            public IEnumerable<TElement> Values => _items.Values;
            private readonly IReadOnlyDictionary<TKey, TElement> _items;
        }

        private readonly Video _video;
    }
}