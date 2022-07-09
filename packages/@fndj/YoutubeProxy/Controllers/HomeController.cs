using Microsoft.AspNetCore.Mvc;
using YoutubeExplode.Videos.Streams;

namespace YoutubeProxy.Controllers;

[ApiController]
[Route("")]
public class HomeController : ControllerBase
{


    public HomeController(ILogger<HomeController> logger, YoutubeExplode.YoutubeClient youtube)
    {
        _logger = logger;
        _youtube = youtube;
    }

    [HttpGet]
    public IActionResult GetHome()
    {
        // return Task.FromResult<IActionResult>(base.RedirectToAction(nameof(GetManifest), new {id = "Y0YZtzWZvdA"}));
        return base.RedirectToAction(nameof(GetInfo), new { id = "Y0YZtzWZvdA", type = StreamType.audio });
    }



    private static string GetId(IStreamInfo streamInfo)
    {
        return Convert.ToBase64String(System.Security.Cryptography.MD5.HashData(System.Text.Encoding.ASCII.GetBytes(streamInfo.Url)));
    }


    [HttpGet("{id}/{type:streamType}")]
    public async Task<IActionResult> GetInfo(string id, StreamType type)
    {
        if (id == null)
            return base.BadRequest();

        var manifest = await _youtube.Videos.Streams.GetManifestAsync(id);

        if (manifest == null)
            return base.NotFound();

        var streams = (type switch
        {
            // StreamType.muxed => manifest?.GetMuxedStreams(),
            StreamType.audio => manifest?.GetAudioOnlyStreams().OfType<IStreamInfo>(),
            StreamType.video => manifest?.GetVideoOnlyStreams(),
            _ => throw new ArgumentException("wtf mate")
        });

        var info = await _youtube.Videos.GetAsync(id);
        return Ok(new
        {
            Id = info.Id.Value,
            info.Title,
            info.Description,
            info.Duration,
            info.UploadDate,
            Author = new
            {
                Name = info.Author.Title,
                info.Author.ChannelTitle,
                ChannelId = info.Author.ChannelId.Value
            },
            Best = base.Url.ActionLink(nameof(GetStream), values: new { id, type, streamId =  "best"}),
            Streams = streams.Select(streamInfo =>
            {
                var result = new System.Dynamic.ExpandoObject();
                var dict = result as IDictionary<string, object>;
    
                dict.Add("Url", base.Url.ActionLink(nameof(GetStream), values: new { id, type, streamId = streamInfo.Bitrate.BitsPerSecond })!);
                dict.Add("Name", streamInfo.Container.Name);
                dict.Add("Bytes", streamInfo.Size.Bytes);
                dict.Add("BitsPerSecond", streamInfo.Bitrate.BitsPerSecond);
                if (streamInfo is AudioOnlyStreamInfo audioInfo)
                {
                    dict.Add("AudioCodec", audioInfo.AudioCodec);
                }
                if (streamInfo is VideoOnlyStreamInfo videoInfo)
                {
                    dict.Add("VideoCodec", videoInfo.VideoCodec);
                    dict.Add("VideoQuality", videoInfo.VideoQuality);
                    dict.Add("VideoResolution", videoInfo.VideoResolution);
                }

                return result;
            }),
            info.Thumbnails,
        });

    }



    [HttpGet("{id}/{type:streamType}/{streamId}")]
    public async Task<IActionResult> GetStream(string id, StreamType type, string streamId)
    {

        if (id == null)
            return base.BadRequest();

        var manifest = await _youtube.Videos.Streams.GetManifestAsync(id);
        var streams = (type switch
        {
            // StreamType.muxed => manifest?.GetMuxedStreams(),
            StreamType.audio => manifest?.GetAudioOnlyStreams().OfType<IStreamInfo>(),
            StreamType.video => manifest?.GetVideoOnlyStreams(),
            _ => throw new ArgumentException("wtf mate")
        });
        var streamInfo = (streamId switch
        {
            "best" => streams?.OrderByDescending(p => p.Bitrate.BitsPerSecond).FirstOrDefault(),
            "worst" => streams?.OrderBy(p => p.Bitrate.BitsPerSecond).FirstOrDefault(),
            _ => int.TryParse(streamId, out var bps) ? streams?.FirstOrDefault(p => p.Bitrate.BitsPerSecond == bps) : streams?.FirstOrDefault(p => streamId == GetId(p))
        });

        if (streamInfo == null)
            return base.NotFound();

        var stream = await _youtube.Videos.Streams.GetAsync(streamInfo);
        return base.File(stream, $"{type.ToString()}/{streamInfo.Container.Name}");

    }

    private readonly ILogger<HomeController> _logger;
    private readonly YoutubeExplode.YoutubeClient _youtube;
}


public enum StreamType
{
    audio,
    video,
    muxed = audio | video,
}
public class StreamTypeConstraint : IRouteConstraint
{
    bool IRouteConstraint.Match(HttpContext? httpContext, IRouter? route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection)
    {
        // retrieve the candidate value
        var candidate = values[routeKey]?.ToString();
        // attempt to parse the candidate to the required Enum type, and return the result
        return Enum.TryParse(candidate, out StreamType _);
    }
}