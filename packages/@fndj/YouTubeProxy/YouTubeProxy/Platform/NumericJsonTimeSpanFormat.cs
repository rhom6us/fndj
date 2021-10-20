using System;
using System.Text.Json;

namespace YouTubeProxy.Platform
{
    public sealed class NumericJsonTimeSpanFormat : JsonTimeSpanFormat
    {
        protected internal override bool TryParseValue(ref Utf8JsonReader reader, out TimeSpan? result)
        {
            result = null;
            try
            {
                switch (reader.TokenType)
                {
                    case JsonTokenType.Null:
                    case JsonTokenType.None:
                        return true;
                    case JsonTokenType.Number:
                        if (reader.TryGetInt64(out var num))
                        {
                            if (num >= 922337203685476.5) // timespan max value
                            {
                                return false;
                            }
                            result = TimeSpan.FromMilliseconds(num);
                            return true;
                        }
                        break;
                }
            }
            catch (Exception) { }
            return false;


        }

        protected internal override void WriteValue(Utf8JsonWriter writer, TimeSpan? value)
        {
            if (value == null)
            {
                writer.WriteNullValue();
                return;
            }
            writer.WriteNumberValue((long)value.Value.TotalMilliseconds);
        }
    }
}