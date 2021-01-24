export enum BROWSER {
  IE = "ie",
  EDGE = "edge",
  CHROME = "chrome",
  FIREFOX = "firefox",
  SAFARI = "safari",
  UNKNOWN = "unknown"
}

export function getBrowserFromUA() {
  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes("msie") || ua.includes("trident")) return BROWSER.IE;
  if (ua.includes("edge")) return BROWSER.EDGE;
  if (ua.includes("chrome")) return BROWSER.CHROME;
  if (ua.includes("firefox")) return BROWSER.FIREFOX;
  if (ua.includes("safari")) return BROWSER.SAFARI;

  return BROWSER.UNKNOWN;
}

export function currentBrowserName() {
  const currentUA = getBrowserFromUA();
  switch (currentUA) {
    case BROWSER.IE:
      return "Internet Explore";
    case BROWSER.EDGE:
      return "Microsoft Edge";
    case BROWSER.FIREFOX:
      return "Firefox";
    case BROWSER.SAFARI:
      return "Safari";
    case BROWSER.CHROME:
      return "Google Chrome";
    default:
      return "unknown";
  }
}

export function isChrome() {
  return getBrowserFromUA() === BROWSER.CHROME;
}
