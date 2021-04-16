using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.Extensions.Logging;
using YoutubeExplode;
using YoutubeExplode.Videos;
using YoutubeExplode.Videos.Streams;

namespace YouTubeProxy.Services {
    public class YoutubeService {
        public YoutubeService(ILogger<YoutubeService> logger, YoutubeClient youtube) {
            _logger = logger;
            _youtube = youtube;
        }

        public Task<Video> GetInfo(string id) {
            return _youtube.Videos.GetAsync(id);
        }

        public async Task<Stream> GetAudio(string id) {
            var manifest = await _youtube.Videos.Streams.GetManifestAsync(id);

            var streamInfo = manifest.GetAudioOnly().WithHighestBitrate();

            if (streamInfo == null)
                throw new ArgumentException("Stream not found", nameof(id));
            return await _youtube.Videos.Streams.GetAsync(streamInfo);
        }

        private readonly ILogger<YoutubeService> _logger;
        private readonly YoutubeClient _youtube;
    }
}