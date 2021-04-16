using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YoutubeExplode.Videos.Streams;

namespace YouTubeProxy.Models {
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
}