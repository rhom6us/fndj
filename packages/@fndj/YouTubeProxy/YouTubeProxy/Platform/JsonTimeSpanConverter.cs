using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using JetBrains.Annotations;

namespace YouTubeProxy.Platform
{
    public partial class JsonTimeSpanConverter : JsonConverterFactory
    {
        public JsonTimeSpanFormat Format { get; set; } = JsonTimeSpanFormat.NumericMilliseconds;
        public override bool CanConvert(Type typeToConvert) =>
            // Don't perform a typeToConvert == null check for performance. Trust our callers will be nice.
            typeToConvert == typeof(TimeSpan) || IsNullableTimeSpan(typeToConvert);

        public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options) =>
            // Don't perform a typeToConvert == null check for performance. Trust our callers will be nice.
            typeToConvert.IsGenericType ? new NullableTimeSpanConverter(Format) : new TimeSpanConverter(Format);


        private static bool IsNullableTimeSpan(Type type) =>
            type.IsGenericType && typeof(TimeSpan).IsAssignableFrom(Nullable.GetUnderlyingType(type));

    }
}