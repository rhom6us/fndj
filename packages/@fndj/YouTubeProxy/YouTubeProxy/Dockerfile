#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["YouTubeProxy/YouTubeProxy.csproj", "YouTubeProxy/"]
RUN dotnet restore "YouTubeProxy/YouTubeProxy.csproj"
COPY . .
WORKDIR "/src/YouTubeProxy"
RUN dotnet build "YouTubeProxy.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "YouTubeProxy.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "YouTubeProxy.dll"]