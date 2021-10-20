using System;
using System.Text.Json;

namespace YouTubeProxy.Platform
{
    public sealed class StringJsonTimeSpanFormat : JsonTimeSpanFormat
    {
        private readonly string _format;

        public StringJsonTimeSpanFormat(string format)
        {
            _format = format;
        }

        protected internal override bool TryParseValue(ref Utf8JsonReader reader, out TimeSpan? result)
        {
            result = null;
            switch (reader.TokenType)
            {
                case JsonTokenType.Null:
                case JsonTokenType.None:
                    return true;
                case JsonTokenType.String:
                    var value = reader.GetString();
                    if (value == null)
                        return true;
                    if (TimeSpan.TryParseExact(value, _format, System.Globalization.CultureInfo.CurrentCulture, out var parsed))
                    {
                        result = parsed;
                        return true;
                    }
                    break;
            }
            return false;
        }

        protected internal override void WriteValue(Utf8JsonWriter writer, TimeSpan? value)
        {
            if (value == null)
            {
                writer.WriteNullValue();
                return;
            }
            writer.WriteStringValue(value.Value.ToString(_format));
        }
    }
}