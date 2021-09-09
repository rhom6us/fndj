using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics.CodeAnalysis;
using System.Linq;

namespace YouTubeProxy.Models {
    [SuppressMessage("ReSharper", "InconsistentNaming")]
    public enum StreamType {
        audio,
        video,
        muxed,
    }
}