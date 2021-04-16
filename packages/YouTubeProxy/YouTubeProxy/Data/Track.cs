using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;

namespace YouTubeProxy.Data {
    public class Track {
        public Track() { }
        

        //public string Id { get; private set; } = null!;
        public float Bpm { get; set; } = 128f;

        public double FirstBeat { get; set; } = 0d;

        //public string Author { get; private set; }
        //public string ChannelId { get; private set; }
        //public string Duration { get; private set; }
        //public string Thumbnail { get; private set; }
        //public string LowResUlr { get; private set; }
        //public string Medium { get; private set; }
        //public string High { get; private set; }
        //public string Standard { get; private set; }
        //public string Max { get; private set; }
        //public string Title { get; private set; }
        //public DateTime UploadDate { get; private set; }
        //public string Url { get; private set; }
    }
 

}
