using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics.CodeAnalysis;
using System.Linq;

namespace YouTubeProxy.Models
{
    public static class Grouping {
        public static Grouping<TGroup, TKey, TElement> Create<TGroup, TKey, TElement>(TGroup group, IDictionary<TKey, TElement> items) where TKey : notnull {
            return new Grouping<TGroup, TKey, TElement>(group, items);
        }
    }
    public class Grouping<TGroup, TKey, TElement> : IGrouping<TGroup, KeyValuePair<TKey, TElement>>, IReadOnlyDictionary<TKey, TElement> where TKey : notnull {
        public Grouping(TGroup group, IDictionary<TKey, TElement> items) {
            this.Key = group;
            _items = new ReadOnlyDictionary<TKey, TElement>(items);
        }

        public TGroup Key { get; }

        IEnumerator<KeyValuePair<TKey, TElement>> IEnumerable<KeyValuePair<TKey, TElement>>.GetEnumerator() {
            return _items.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator() {
            return ((IEnumerable)_items).GetEnumerator();
        }


        int IReadOnlyCollection<KeyValuePair<TKey, TElement>>.Count => _items.Count;


        bool IReadOnlyDictionary<TKey, TElement>.ContainsKey(TKey key) {
            return _items.ContainsKey(key);
        }

        bool IReadOnlyDictionary<TKey, TElement>.TryGetValue(TKey key, [AllowNull]out TElement value) {
            return _items.TryGetValue(key, out value!);
        }

        TElement IReadOnlyDictionary<TKey, TElement>.this[TKey key] => _items[key];
        IEnumerable<TKey> IReadOnlyDictionary<TKey, TElement>.Keys => _items.Keys;

        IEnumerable<TElement> IReadOnlyDictionary<TKey, TElement>.Values => _items.Values;
        private readonly IReadOnlyDictionary<TKey, TElement> _items;
    }
}
