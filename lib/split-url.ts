export default function splitUrl(urlString: string) {
  const url = new URL(urlString);
  const pathArray = url.pathname.split("/");
  const fileName = pathArray[pathArray.length - 1];
  const directory = url.pathname.substring(
    0,
    url.pathname.lastIndexOf("/") + 1
  );
  const path = fileName ? directory + fileName : directory;
  const domainParts = url.hostname.split(".");
  const tld = domainParts.pop();
  const domain = domainParts.join(".");

  return {
    Scheme: url.protocol.slice(0, -1),
    Protocol: url.protocol.slice(0, -1),
    Authority: url.host,
    Host: url.host,
    Hostname: url.hostname,
    Domain: domain,
    Tld: tld,
    Resource: url.pathname + url.search,
    Directory: directory,
    Path: path,
    FileName: fileName,
    QueryString: url.search.slice(1),
  };
}
