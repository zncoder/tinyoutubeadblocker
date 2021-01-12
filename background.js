chrome.webRequest.onBeforeRequest.addListener(
  details => filterRequest(details),
  { urls: ["<all_urls>"] },
  ["blocking"]
)

let urlPrefixes = [
  "https://www.youtube.com/get_video_info", // <-- ads
  "https://www.youtube.com/youtubei/v1/log_event",
  "https://www.youtube.com/ptracking",
  "https://www.youtube.com/pagead/conversion/",
  "https://www.youtube.com/api/stats/",
  "https://www.google.com/pagead/",
  "https://www.youtube.com/pagead/",
]

let hostSuffixes = [
  ".doubleclick.net",
  ".googlesyndication.com",
]

function filterRequest(details) {
  let url = details.url
  for (let p of urlPrefixes) {
    if (url.startsWith(p)) {
      //console.log(`block youtube ad:${url}`)
      return {cancel: true}
    }
  }
  let u = new URL(url)
  for (let s of hostSuffixes) {
    if (u.hostname.endsWith(s)) {
      //console.log(`block doubleclick ad:${url}`)
      return {cancel: true}
    }
  }
  //console.log(`${url} ok`)
  return {}
}
