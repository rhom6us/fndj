using System;
using System.Diagnostics;
using System.Reflection;
using System.Text.Json;

namespace YouTubeProxy.Platform
{
    internal static class GenerateJsonException
    {
        private static readonly PropertyInfo? s_JsonException_AppendPathInformation
            = typeof(JsonException).GetProperty("AppendPathInformation", BindingFlags.NonPublic | BindingFlags.Instance);

        /// <summary>
        /// Generate a <see cref="JsonException"/> using the internal
        /// <c>JsonException.AppendPathInformation</c> property that will
        /// eventually include the JSON path, line number, and byte position in
        /// line.
        /// <para>
        /// The final message of the exception looks like: The JSON value could
        /// not be converted to {0}. Path: $.{JSONPath} | LineNumber:
        /// {LineNumber} | BytePositionInLine: {BytePositionInLine}.
        /// </para>
        /// </summary>
        /// <param name="propertyType">Property type.</param>
        /// <returns><see cref="JsonException"/>.</returns>
        public static JsonException DeserializeUnableToConvertValue(Type propertyType)
        {
            Debug.Assert(s_JsonException_AppendPathInformation != null);

            var jsonException = new JsonException($"The JSON value could not be converted to {propertyType}.");
            s_JsonException_AppendPathInformation?.SetValue(jsonException, true);
            return jsonException;
        }

        /// <summary>
        /// Generate a <see cref="JsonException"/> using the internal
        /// <c>JsonException.AppendPathInformation</c> property that will
        /// eventually include the JSON path, line number, and byte position in
        /// line.
        /// <para>
        /// The final message of the exception looks like: The JSON value '{1}'
        /// could not be converted to {0}. Path: $.{JSONPath} | LineNumber:
        /// {LineNumber} | BytePositionInLine: {BytePositionInLine}.
        /// </para>
        /// </summary>
        /// <param name="propertyType">Property type.</param>
        /// <param name="propertyValue">Value that could not be parsed into
        /// property type.</param>
        /// <param name="innerException">Optional inner <see cref="Exception"/>.</param>
        /// <returns><see cref="JsonException"/>.</returns>
        public static JsonException DeserializeUnableToConvertValue(Type propertyType, object? propertyValue, Exception? innerException = null)
        {
            Debug.Assert(s_JsonException_AppendPathInformation != null);

            var jsonException = new JsonException($"The JSON value '{propertyValue}' could not be converted to {propertyType}.", innerException);
            s_JsonException_AppendPathInformation?.SetValue(jsonException, true);
            return jsonException;
        }

        internal static ArgumentNullException ThrowArgumentNullException(ExceptionArgument arg)
        {
            return new ArgumentNullException(arg.ToString());
        }

        internal static ArgumentOutOfRangeException ThrowArgumentOutOfRangeException(ExceptionArgument arg)
        {
            return new ArgumentOutOfRangeException(arg.ToString());
        }
    }
}