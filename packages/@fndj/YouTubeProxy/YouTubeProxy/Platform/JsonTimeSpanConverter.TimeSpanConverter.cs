using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace YouTubeProxy.Platform
{
    public partial class JsonTimeSpanConverter
    {
      

        private class TimeSpanConverter : JsonConverter<TimeSpan>
        {
            private readonly JsonTimeSpanFormat _formatter;

            public TimeSpanConverter(JsonTimeSpanFormat formatter)
            {
                _formatter = formatter;
            }

            public override TimeSpan Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
            {
                if (_formatter.TryParseValue(ref reader, out var value))
                {
                    if(value != null)
                    {
                        return value.Value;
                    }
                }
                throw GenerateJsonException.DeserializeUnableToConvertValue(typeof(TimeSpan), value);
            }

            public override void Write(Utf8JsonWriter writer, TimeSpan value, JsonSerializerOptions options) =>
                _formatter.WriteValue(writer, value);
        }
    }
}