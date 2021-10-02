using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;

namespace YouTubeProxy.Controllers {
    public class CachingStream : Stream {
        private readonly Stream _source;
        public CachingStream(Stream source) {
            _source = source;
        }

        public override void Flush() {
            _source.Flush();
        }

        public Action<byte[]> Complete { get; set; } = p => { };

        protected virtual void OnComplete(byte[] buffer) {
            this.Complete?.Invoke(buffer);
        }

        private void CompleteMe() {
            this.OnComplete(this.GetCache());
        }
        private List<Memory<byte>> _cache = new List<Memory<byte>>();

        public byte[] GetCache() {
            var length = _cache.Sum(p => p.Length);
            var buffer = new byte[length];
            var pos = 0;
            _cache.ForEach(
                mem => {
                    mem.CopyTo(buffer.AsMemory(pos));
                    pos += mem.Length;
                });
            return buffer;
        }
        public override int Read(byte[] buffer, int offset, int count) {

            var result = _source.Read(buffer, offset, count);
            _cache.Add(buffer.AsMemory(offset, count));

            return result;
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                this.CompleteMe();
                _source?.Dispose();
            }

            base.Dispose(disposing);
        }

        public override long Seek(long offset, SeekOrigin origin) {
            throw new NotSupportedException();
        }

        public override void SetLength(long value) {
            throw new NotSupportedException();
        }

        public override void Write(byte[] buffer, int offset, int count) {
            throw new NotSupportedException();
        }


        public override bool CanRead => _source.CanRead;

        public override bool CanSeek => false;

        public override bool CanWrite => false;

        public override long Length => _source.Length;

        public override long Position {
            get => _source.Position;
            set => throw new NotSupportedException();
        }
    }
}