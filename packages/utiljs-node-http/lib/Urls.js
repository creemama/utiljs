import https from "node:https";
import http from "node:http";
import { pipeline } from "node:stream/promises";
import Files from "@util.js/node-files";

// These are global variables for Chromium version management.
let latestChromiumAndroidStableVersion;
let latestChromiumAndroidStableVersionLocked = false;
let googleBotUserAgentHeaderLogged = false;

/**
 * Determine timeout value in milliseconds from the parameters object.
 */
function determineTimeout(params) {
  if (params == null) return -1;
  const timeoutVal = params?.timeoutMs;
  const parsedInt = Number.parseInt(timeoutVal, 10);
  if (timeoutVal != null && !Number.isNaN(parsedInt) && parsedInt >= 0) {
    return parsedInt;
  }
  return -1;
}

/**
 * Fetch the latest Chromium Android stable version from the API.
 */
async function fetchLatestChromiumAndroidStableVersion() {
  const CHANNEL = "Stable";
  const url = `https://chromiumdash.appspot.com/fetch_releases?platform=Android&channel=${CHANNEL}&num=1`;

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Fetching ${url} failed with HTTP status ${response.status}.`,
    );

  const data = await response.json();
  if (!data || data.length === 0)
    throw new Error("The Chromium Dash API returned an empty response.");

  const latest = data[0];
  if (!latest || !latest.version)
    throw new Error(
      "The version field is missing in the Chromium Dash API response.",
    );
  return latest.version;
}

/**
 * Get the Google Bot user agent header with the latest Chromium version.
 */
async function getGoogleBotUserAgentHeader(logger) {
  // https://chromiumdash.appspot.com/releases?platform=Android
  // https://github.com/wasi-master/13ft/blob/main/app/portable.py
  // https://web.archive.org/web/20260811103458/https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#googlebot-news#googlebot-news

  const latestChromiumAndroidStableVersion =
    await getLatestChromiumAndroidStableVersion(logger);
  const userAgent = `Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${latestChromiumAndroidStableVersion} Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)`;

  if (!googleBotUserAgentHeaderLogged) {
    googleBotUserAgentHeaderLogged = true;
    logger?.error?.("Using the following user agent for HTTP requests: ");
    logger?.error?.(userAgent);
    logger?.error?.();
  }

  return userAgent;
}

/**
 * Get the latest Chromium Android stable version with fallback support.
 */
async function getLatestChromiumAndroidStableVersion(logger) {
  while (latestChromiumAndroidStableVersionLocked) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  latestChromiumAndroidStableVersionLocked = true;
  try {
    if (latestChromiumAndroidStableVersion)
      return latestChromiumAndroidStableVersion;

    try {
      latestChromiumAndroidStableVersion =
        await fetchLatestChromiumAndroidStableVersion();
    } catch (fetchErr) {
      const fallbackVersion = "152.0.7977.42";
      logger?.error?.(
        `Fetching the latest Chromium version failed: ${fetchErr.message}`,
      );
      logger?.error?.(
        `Falling back to hardcoded version '${fallbackVersion}'...`,
      );
      latestChromiumAndroidStableVersion = fallbackVersion;
    }

    logger?.error?.();
    logger?.error?.(
      `The latest Chromium Android stable version is '${latestChromiumAndroidStableVersion}'.`,
    );
    logger?.error?.();
    return latestChromiumAndroidStableVersion;
  } finally {
    latestChromiumAndroidStableVersionLocked = false;
  }
}

/**
 * Normalize the input into a valid URL object.
 */
function parseUrl(url) {
  try {
    return typeof url === "string" ? new URL(url) : url;
  } catch (err) {
    throw new TypeError(`The provided URL "${url}" is invalid.`);
  }
}

class Urls {
  /**
   * Decode a Uniform Resource Identifier (URI).
   */
  static decodeURI(...args) {
    return decodeURI(...args);
  }

  /**
   * Decode a Uniform Resource Identifier (URI) component.
   */
  static decodeURIComponent(...args) {
    return decodeURIComponent(...args);
  }

  /**
   * Encode a Uniform Resource Identifier (URI).
   */
  static encodeURI(...args) {
    return encodeURI(...args);
  }

  /**
   * Encode a Uniform Resource Identifier (URI) component.
   */
  static encodeURIComponent(...args) {
    return encodeURIComponent(...args);
  }

  /**
   * Get HTTP headers for the given URL using a HEAD request.
   * http://stackoverflow.com/questions/5922842/getting-http-headers-with-node-js
   * http://stackoverflow.com/a/6001507
   */
  static async headers(params) {
    const timeoutMs = determineTimeout(params);
    const {
      headers: customHeaders = {},
      logger,
      url,
      useGoogleBotUserAgent = false,
    } = params || {};

    const urlObj = parseUrl(url);
    const p = urlObj.protocol === "http:" ? http : https;
    let headers = { ...customHeaders };

    if (useGoogleBotUserAgent && !headers["User-Agent"]) {
      headers["User-Agent"] = await getGoogleBotUserAgentHeader(logger);
    }

    const reqOptions = {
      ...params,
      timeout: timeoutMs !== -1 ? timeoutMs : undefined,
      headers,
      hostname: urlObj.hostname,
      method: "HEAD",
      path: urlObj.pathname + urlObj.search,
      port: urlObj.port || (urlObj.protocol === "https:" ? 443 : 80),
    };

    return new Promise((resolve, reject) => {
      const req = p.request(reqOptions, (res) => {
        res.destroy();
        resolve(res.headers);
      });

      req.on("error", reject);

      if (timeoutMs !== -1) {
        // https://stackoverflow.com/a/12783062
        req.on("socket", (socket) => {
          socket.setTimeout(timeoutMs);
          socket.on("timeout", () => {
            req.destroy(new Error("The request timed out."));
          });
        });
      }

      req.end();
    });
  }

  /**
   * Convert the given URL content to a buffer.
   */
  static async urlToBuffer(params) {
    const timeoutMs = determineTimeout(params);
    const { logger, url, useGoogleBotUserAgent = false } = params || {};
    const chunks = await this.urlToData({
      logger,
      timeoutMs,
      url,
      useGoogleBotUserAgent,
    });
    return Buffer.concat(chunks);
  }

  /**
   * Get data from the given URL as chunks.
   */
  static async urlToData(params) {
    const timeoutMs = determineTimeout(params);
    const {
      headers,
      logger,
      url,
      useGoogleBotUserAgent = false,
    } = params || {};

    const readable = await this.urlToReadStream({
      headers,
      logger,
      timeoutMs,
      url,
      useGoogleBotUserAgent,
    });

    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(chunk);
    }
    return chunks;
  }

  /**
   * Download the given URL to the given local file.
   */
  static async urlToFile(params) {
    const timeoutMs = determineTimeout(params);
    const {
      file,
      logger,
      maxRedirects,
      url,
      useGoogleBotUserAgent = false,
    } = params || {};

    const readable = await this.urlToReadStream({
      logger,
      maxRedirects,
      timeoutMs,
      url,
      useGoogleBotUserAgent,
    });

    const writable = Files.createWriteStream(file);
    await pipeline(readable, writable);
  }

  /**
   * Get the HTTP stream for the given URL with redirect and timeout support.
   */
  static async urlToReadStream(params) {
    const timeoutMs = determineTimeout(params);
    const {
      headers: customHeaders = {},
      logger,
      maxRedirects = 0,
      url,
      useGoogleBotUserAgent = false,
    } = params || {};

    const urlObj = parseUrl(url);
    const p = urlObj.protocol === "http:" ? http : https;
    let headers = { ...customHeaders };

    if (useGoogleBotUserAgent && !headers["User-Agent"]) {
      headers["User-Agent"] = await getGoogleBotUserAgentHeader(logger);
    }

    return new Promise((resolve, reject) => {
      const req = p.get(urlObj, { headers }, (res) => {
        const { statusCode } = res;

        if (statusCode !== 200) {
          if (statusCode >= 300 && statusCode < 400 && res.headers.location) {
            if (maxRedirects > 0) {
              const newUrl = new URL(res.headers.location, urlObj);
              res.resume(); // Free memory.
              Urls.urlToReadStream({
                headers,
                logger,
                maxRedirects: maxRedirects - 1,
                timeoutMs,
                url: newUrl,
                useGoogleBotUserAgent,
              })
                .then(resolve)
                .catch(reject);
              return;
            }
          }

          res.resume();
          const error = new Error(
            `The request for ${urlObj.href} failed with status code ${statusCode}.`,
          );
          error.headers = res.headers;
          error.statusCode = statusCode;
          error.url = urlObj.href;
          return reject(error);
        }

        resolve(res);
      });

      req.on("error", reject);

      if (timeoutMs !== -1) {
        // https://stackoverflow.com/a/12783062
        req.on("socket", (socket) => {
          socket.setTimeout(timeoutMs);
          socket.on("timeout", () => {
            req.destroy(new Error("The request timed out."));
          });
        });
      }
    });
  }

  /**
   * Proxy the HTTP request for the given URL to the given web response.
   */
  static async urlToResponse(params) {
    const timeoutMs = determineTimeout(params);
    const {
      logger,
      response,
      url,
      useGoogleBotUserAgent = false,
    } = params || {};

    const readable = await Urls.urlToReadStream({
      logger,
      timeoutMs,
      url,
      useGoogleBotUserAgent,
    });

    response.set(readable.headers);
    await pipeline(readable, response);
  }

  /**
   * Convert the given URL content to a string, auto-detecting its charset from Content-Type headers.
   */
  static async urlToString(params) {
    const timeoutMs = determineTimeout(params);
    const {
      encoding: explicitEncoding,
      headers,
      logger,
      url,
      useGoogleBotUserAgent = false,
    } = params || {};

    const readable = await this.urlToReadStream({
      headers,
      logger,
      timeoutMs,
      url,
      useGoogleBotUserAgent,
    });

    let encoding = explicitEncoding;

    if (!encoding) {
      const contentType = readable.headers?.["content-type"];
      if (contentType) {
        const match = contentType.match(/charset=([^;]+)/i);
        if (match) {
          encoding = match[1].trim().replace(/['"]/g, "").toLowerCase();
        }
      }
    }

    // Map common charset names to Node.js Buffer encodings.
    if (encoding === "iso-8859-1") {
      encoding = "latin1";
    } else if (encoding === "utf-8") {
      encoding = "utf8";
    }

    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    try {
      return buffer.toString(encoding || "utf8");
    } catch (err) {
      // Fall back to utf8 if Node.js does not recognize the encoding.
      return buffer.toString("utf8");
    }
  }
}

export default Urls;
