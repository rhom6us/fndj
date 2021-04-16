using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace YouTubeProxy.Models {
    [SuppressMessage("ReSharper", "InconsistentNaming")]
    public enum StreamType {
        audio,
        video,
        muxed,
    }

    public class StreamTypeConstraint : IRouteConstraint {
        bool IRouteConstraint.Match(HttpContext httpContext, IRouter route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection) {
            // retrieve the candidate value
            var candidate = values[routeKey]?.ToString();
            // attempt to parse the candidate to the required Enum type, and return the result
            return Enum.TryParse(candidate, out StreamType _);
        }
    }
}