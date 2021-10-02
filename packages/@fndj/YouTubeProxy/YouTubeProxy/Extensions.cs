using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace YouTubeProxy {
    internal static class Extensions {

        public static IEnumerable<T> ToEnumerable<T>(this T obj) {
            return Enumerable.Empty<T>().DefaultIfEmpty(obj);
        }
        public static IQueryable<T> ToQueryable<T>(this T obj) {
            return obj.ToEnumerable().AsQueryable();
        }
    }
}