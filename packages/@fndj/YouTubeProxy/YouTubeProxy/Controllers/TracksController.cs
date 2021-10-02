using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using YoutubeExplode.Videos;
using YouTubeProxy.Data;
using YouTubeProxy.Models;
using YouTubeProxy.Services;

namespace YouTubeProxy.Controllers {
    [ApiController]
    [Route("")]
    public class TracksController : ControllerBase {
        public TracksController(ILogger<TracksController> logger, YoutubeMediaContext db, YoutubeService youtube /*, IMemoryCache cache*/) {
            _logger = logger;
            _db = db;
            _youtube = youtube;
            //_cache = cache;
        }

        //[HttpGet("")]
        [EnableQuery(MaxTop = 20)]
        public IQueryable<YoutubeMedia> GetAll() {
            return _db.YoutubeMedia;
        }


        [HttpGet("{id}/raw")]
        [EnableQuery(MaxTop = 20)]
        public async Task<Models.SingleResult<Video>> GetRaw(string id, bool includeDetail = false) {
            var video = await _youtube.GetInfo(id) ?? throw new ArgumentException($"Could not find video with id \"{id}\"", nameof(id));

            return new Models.SingleResult<Video>(video);
        }

        [HttpGet("{id}")]
        [EnableQuery(MaxTop = 20)]
        public async Task<Models.SingleResult<YoutubeMedia>> Get(string id, bool includeDetail = false) {
            var video = await _youtube.GetInfo(id) ?? throw new ArgumentException($"Could not find video with id \"{id}\"", nameof(id));

            return new Models.SingleResult<YoutubeMedia>(video);

            ////var query = _db.YoutubeMedia.Where(p => p.Id == id);
            //if (includeDetail) {
            //    //query = query.Include(p => p.Track);
            //}
            //var dbResult = await _db.YoutubeMedia.FindAsync(id);// query.SingleOrDefaultAsync();

            //if (dbResult == null) {
            //    var webResult = await _youtube.GetInfo(id);
            //    var entry = await _db.YoutubeMedia.AddAsync(webResult);
            //    dbResult = entry.Entity;
            //    await _db.SaveChangesAsync();
            //}



        }
        //[HttpGet("{id}/detail")]
        //public Task<YoutubeMedia> GetDetail(string id) {
        //    return _db.YoutubeMedia.Where(p => p.Id == id)/*.Select(p => p.Track)*/.AsNoTracking().SingleOrDefaultAsync();
        //}
        //[HttpPost("{id}/detail")]
        //public async Task<IActionResult> Update(string id, [FromBody] Track track) {

        //    var existing = await _db.YoutubeMedia.FindAsync(id);
        //    if (existing == null) {
        //        return this.NotFound(id);
        //    }

        //    //existing.Track.Bpm = track.Bpm;
        //    //existing.Track.FirstBeat = track.FirstBeat;

        //    await _db.SaveChangesAsync();
        //    return this.Ok(existing.Track);
        //}

        //private readonly IMemoryCache _cache;
        [HttpGet("{id}/{type:streamType}")]
        public async Task<IActionResult> Stream(string id, StreamType type) {
            //var cacheKey = $"{id}-${type}";
            //if (_cache.TryGetValue(cacheKey, out var cacheEntry)) {
            //    var buffer = (byte[]) cacheEntry;
            //    await using var memStream = new MemoryStream(buffer);
            //    return base.File(memStream, type == StreamType.audio ? "audio/mp3" : "video/mp4");
            //}

            try {
                var stream = await (type switch {
                    StreamType.video => _youtube.GetVideo(id),
                    StreamType.audio => _youtube.GetAudio(id),
                    StreamType.muxed => _youtube.GetMuxed(id),
                    _ => throw new ArgumentOutOfRangeException(nameof(type), type, null)
                });
                return base.File(
                    fileStream: stream, 
                    contentType: type switch {
                        StreamType.audio => "audio/mp3",
                        StreamType.video => "video/mp4",
                        StreamType.muxed => "video/mp4",
                        _ => throw new ArgumentOutOfRangeException(nameof(type), type, null)
                    });



                //await using var cacheStream = new CachingStream(stream) {
                //    Complete = buffer => _cache.Set(cacheKey, buffer, TimeSpan.FromDays(1))
                //};
            }
            catch (YoutubeService.StreamNotFoundException) {
                return base.NotFound(id);
            }
        }

        //private readonly IMemoryCache _cache;
        private readonly ILogger<TracksController> _logger;
        private readonly YoutubeService _youtube;
        private readonly YoutubeMediaContext _db;
    }
}