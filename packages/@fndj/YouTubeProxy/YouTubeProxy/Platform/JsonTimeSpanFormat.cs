using System;
using System.Text.Json;

namespace YouTubeProxy.Platform
{
    public abstract class JsonTimeSpanFormat
    {
        public static readonly JsonTimeSpanFormat NumericMilliseconds = new NumericJsonTimeSpanFormat();
        public static readonly JsonTimeSpanFormat Invariant = new StringJsonTimeSpanFormat("c");
        public static readonly JsonTimeSpanFormat Short = new StringJsonTimeSpanFormat("g");
        public static readonly JsonTimeSpanFormat Long = new StringJsonTimeSpanFormat("G");
        public static JsonTimeSpanFormat Custom(string format) => new StringJsonTimeSpanFormat(format);
        protected internal abstract void WriteValue(Utf8JsonWriter writer, TimeSpan? value);
        protected internal abstract bool TryParseValue(ref Utf8JsonReader reader, out TimeSpan? result);
    }
}