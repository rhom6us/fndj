
export function isUrl(url: any): url is URL {
  return url instanceof URL;
}
