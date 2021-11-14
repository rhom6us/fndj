using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.Extensions.Logging;
using YoutubeExplode;
using YoutubeExplode.Converter;
using YoutubeExplode.Videos;
using YoutubeExplode.Videos.Streams;

namespace YouTubeProxy.Services {
    public class YoutubeService {
        public YoutubeService(ILogger<YoutubeService> logger, YoutubeClient youtube) {
            _logger = logger;
            _youtube = youtube;
        }

        public ValueTask<Video> GetInfo(string id) {
            return _youtube.Videos.GetAsync(id);
        }

        public async Task<Stream> GetAudio(string id) {
            if (id == null)
                throw new ArgumentNullException(nameof(id));
            var manifest = await _youtube.Videos.Streams.GetManifestAsync(id);
           
            var streamInfo = manifest.GetAudioOnlyStreams().GetWithHighestBitrate() ?? throw new StreamNotFoundException("Stream not found", nameof(id));

            return await _youtube.Videos.Streams.GetAsync(streamInfo);
        }
        public async Task<Stream> GetVideo(string id) {
            if (id == null)
                throw new ArgumentNullException(nameof(id));
            var manifest = await _youtube.Videos.Streams.GetManifestAsync(id);

            var streamInfo = manifest.GetVideoOnlyStreams().GetWithHighestVideoQuality() ?? throw new StreamNotFoundException("Stream not found", nameof(id));

            return await _youtube.Videos.Streams.GetAsync(streamInfo);
        }
        public async Task<Stream> GetMuxed(string id) {
            if (id == null)
                throw new ArgumentNullException(nameof(id));
            
            var manifest = await _youtube.Videos.Streams.GetManifestAsync(id);
            var streams = manifest.GetMuxedStreams();
            var streamInfo = streams.GetWithHighestVideoQuality() ?? throw new StreamNotFoundException("Stream not found", nameof(id));

            return await _youtube.Videos.Streams.GetAsync(streamInfo);
        }

        private readonly ILogger<YoutubeService> _logger;
        private readonly YoutubeClient _youtube;

        public class StreamNotFoundException : ArgumentException {
            protected StreamNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context) { }
            public StreamNotFoundException(string? message) : base(message) { }
            public StreamNotFoundException(string? message, Exception? innerException) : base(message, innerException) { }
            public StreamNotFoundException(string? message, string? paramName) : base(message, paramName) { }
            public StreamNotFoundException(string? message, string? paramName, Exception? innerException) : base(message, paramName, innerException) { }

            public StreamNotFoundException() {
                
            }
                
        }
    }
}