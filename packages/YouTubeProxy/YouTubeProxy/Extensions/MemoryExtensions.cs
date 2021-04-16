#nullable enable
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace YouTubeProxy {
    public static class MemoryExtensions {
        //public static ReadOnlyMemory<T> AsReadOnlyMemory<T>(this T[] array) => new ReadOnlyMemory<T>(array);
        //public static ReadOnlyMemory<T> AsReadOnlyMemory<T>(this T[] array, Range range) => AsReadOnlyMemory<T>(array, range.Start.Value, range.End.Value - range.Start.Value);
        //public static ReadOnlyMemory<T> AsReadOnlyMemory<T>(this T[] array, int start, int length) => new ReadOnlyMemory<T>(array, start, length);

        /// <summary>
        /// Creates a new ReadOnlyMemory over the target array.
        /// </summary>
        public static ReadOnlyMemory<T> AsReadOnlyMemory<T>(this T[]? array) => new ReadOnlyMemory<T>(array);

        /// <summary>
        /// Creates a new ReadOnlyMemory over the portion of the target array beginning
        /// at 'start' index and ending at 'end' index (exclusive).
        /// </summary>
        /// <param name="array">The target array.</param>
        /// <param name="start">The index at which to begin the memory.</param>
        /// <remarks>Returns default when <paramref name="array"/> is null.</remarks>
        /// <exception cref="System.ArrayTypeMismatchException">Thrown when <paramref name="array"/> is covariant and array's type is not exactly T[].</exception>
        /// <exception cref="System.ArgumentOutOfRangeException">
        /// Thrown when the specified <paramref name="start"/> or end index is not in the range (&lt;0 or &gt;array.Length).
        /// </exception>
        public static ReadOnlyMemory<T> AsReadOnlyMemory<T>(this T[]? array, int start) => AsReadOnlyMemory<T>(array, start..^0);

        /// <summary>
        /// Creates a new ReadOnlyMemory over the portion of the target array starting from
        /// 'startIndex' to the end of the array.
        /// </summary>
        public static ReadOnlyMemory<T> AsReadOnlyMemory<T>(this T[]? array, Index startIndex) => AsReadOnlyMemory<T>(array, startIndex..^0);

        /// <summary>
        /// Creates a new ReadOnlyMemory over the portion of the target array beginning
        /// at 'start' index and ending at 'end' index (exclusive).
        /// </summary>
        /// <param name="array">The target array.</param>
        /// <param name="start">The index at which to begin the memory.</param>
        /// <param name="length">The number of items in the memory.</param>
        /// <remarks>Returns default when <paramref name="array"/> is null.</remarks>
        /// <exception cref="System.ArrayTypeMismatchException">Thrown when <paramref name="array"/> is covariant and array's type is not exactly T[].</exception>
        /// <exception cref="System.ArgumentOutOfRangeException">
        /// Thrown when the specified <paramref name="start"/> or end index is not in the range (&lt;0 or &gt;Length).
        /// </exception>
        public static ReadOnlyMemory<T> AsReadOnlyMemory<T>(this T[]? array, int start, int length) => new ReadOnlyMemory<T>(array, start, length);

        /// <summary>
        /// Creates a new ReadOnlyMemory over the portion of the target array beginning at inclusive start index of the range
        /// and ending at the exclusive end index of the range.
        /// </summary>
        public static ReadOnlyMemory<T> AsReadOnlyMemory<T>(this T[]? array, Range range) {
            if (array == null) {
                var startIndex = range.Start;
                var endIndex = range.End;
                if (!startIndex.Equals(Index.Start) || !endIndex.Equals(Index.Start))
                    ThrowHelper.ThrowArgumentNullException(ExceptionArgument.array);

                return default;
            }

            var (start, length) = range.GetOffsetAndLength(array.Length);
            return new ReadOnlyMemory<T>(array, start, length);
        }



        /// <summary>
        /// Creates a new ReadOnlyMemory over the portion of the target array.
        /// </summary>
        public static ReadOnlyMemory<T> AsReadOnlyMemory<T>(this ArraySegment<T> segment) => new ReadOnlyMemory<T>(segment.Array, segment.Offset, segment.Count);

        /// <summary>
        /// Creates a new ReadOnlyMemory over the portion of the target array beginning
        /// at 'start' index and ending at 'end' index (exclusive).
        /// </summary>
        /// <param name="segment">The target array.</param>
        /// <param name="start">The index at which to begin the memory.</param>
        /// <remarks>Returns default when <paramref name="segment"/> is null.</remarks>
        /// <exception cref="System.ArrayTypeMismatchException">Thrown when <paramref name="segment"/> is covariant and array's type is not exactly T[].</exception>
        /// <exception cref="System.ArgumentOutOfRangeException">
        /// Thrown when the specified <paramref name="start"/> or end index is not in the range (&lt;0 or &gt;segment.Count).
        /// </exception>
        public static ReadOnlyMemory<T> AsReadOnlyMemory<T>(this ArraySegment<T> segment, int start) {
            if (((uint)start) > (uint)segment.Count)
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.start);

            return new ReadOnlyMemory<T>(segment.Array, segment.Offset + start, segment.Count - start);
        }

        /// <summary>
        /// Creates a new ReadOnlyMemory over the portion of the target array beginning
        /// at 'start' index and ending at 'end' index (exclusive).
        /// </summary>
        /// <param name="segment">The target array.</param>
        /// <param name="start">The index at which to begin the memory.</param>
        /// <param name="length">The number of items in the memory.</param>
        /// <remarks>Returns default when <paramref name="segment"/> is null.</remarks>
        /// <exception cref="System.ArrayTypeMismatchException">Thrown when <paramref name="segment"/> is covariant and array's type is not exactly T[].</exception>
        /// <exception cref="System.ArgumentOutOfRangeException">
        /// Thrown when the specified <paramref name="start"/> or end index is not in the range (&lt;0 or &gt;segment.Count).
        /// </exception>
        public static ReadOnlyMemory<T> AsReadOnlyMemory<T>(this ArraySegment<T> segment, int start, int length) {
            if (((uint)start) > (uint)segment.Count)
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.start);
            if (((uint)length) > (uint)(segment.Count - start))
                ThrowHelper.ThrowArgumentOutOfRangeException(ExceptionArgument.length);

            return new ReadOnlyMemory<T>(segment.Array, segment.Offset + start, length);
        }

    }
}
