using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace YouTubeProxy.Models {
    public static class Grouping {
        public static Grouping<TGroup, TKey, TElement> Create<TGroup, TKey, TElement>(TGroup group, IDictionary<TKey, TElement> items) {
            return new Grouping<TGroup, TKey, TElement>(group, items);
        }
    }
    public class Grouping<TGroup, TKey, TElement> : IGrouping<TGroup, KeyValuePair<TKey, TElement>>, IReadOnlyDictionary<TKey, TElement> {
        public Grouping(TGroup group, IDictionary<TKey, TElement> items) {
            this.Key = group;
            _items = new ReadOnlyDictionary<TKey, TElement>(items);
        }

        public TGroup Key { get; }

        public IEnumerator<KeyValuePair<TKey, TElement>> GetEnumerator() {
            return _items.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator() {
            return ((IEnumerable)_items).GetEnumerator();
        }


        public int Count => _items.Count;


        public bool ContainsKey(TKey key) {
            return _items.ContainsKey(key);
        }


        public bool TryGetValue(TKey key, out TElement value) {
            return _items.TryGetValue(key, out value);
        }

        public TElement this[TKey key] => _items[key];
        public IEnumerable<TKey> Keys => _items.Keys;

        public IEnumerable<TElement> Values => _items.Values;
        private readonly IReadOnlyDictionary<TKey, TElement> _items;
    }
}
