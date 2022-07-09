using System;
using System.Linq;

namespace YouTubeProxy.Models
{
    /// <summary>
    /// Represents an <see cref="IQueryable{T}"/> containing zero or one entities. Use together with an
    /// <c>[EnableQuery]</c>.
    /// </summary>
    /// <typeparam name="T">The type of the data in the data source.</typeparam>
    public class SingleResult<T> : Microsoft.AspNetCore.OData.Results.SingleResult {

        public SingleResult(IQueryable<T> queryable) : base(queryable) {
            _ = queryable ?? throw new ArgumentNullException(nameof(queryable));
        }
        public SingleResult(T value)
            : this(Enumerable.Empty<T>().DefaultIfEmpty(value).AsQueryable()) {
            _ = value ?? throw new ArgumentNullException(nameof(value));
        }

        /// <summary>
        /// The <see cref="IQueryable{T}"/> containing zero or one entities.
        /// </summary>
        public new IQueryable<T> Queryable => base.Queryable as IQueryable<T> ?? throw new InvalidOperationException("Base value is null");
    }
    
}
