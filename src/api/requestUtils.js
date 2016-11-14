import ApiError from './ApiError';
const ignoredStatusCodes = [204];

export function buildUri(path, queryParams) {
  const enc = encodeURIComponent;
  const queryString = Object.keys(queryParams||{}).map((queryParam) => {
    return `${enc(queryParam)}=${enc(queryParams[queryParam])}`;
  }).join('&');
  return (queryString && `${path}?${queryString}`) || path;
}

export function doRateLimit(response, options) {
  if(options.rateLimitCallback && (typeof options.rateLimitCallback === 'function')) {
    const rateLimitUsed = response.headers.get('x-ratelimit-used');
    const rateLimitReset = response.headers.get('x-ratelimit-reset');
    const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');

    options.rateLimitCallback({
      used: rateLimitUsed,
      reset: rateLimitReset,
      remaining: rateLimitRemaining,
    });
  }
}

export function checkHttpStatus(response, error = null) {
  if(error) {
    return Promise.reject(error);
  }

  if (response.status >= 200 && response.status < 400) {
    return Promise.resolve(response);
  }

  const jsonPromise = parseJsonIfAvailable(response);

  if(jsonPromise) {
    return jsonPromise.then(({json}) => {
      throw new ApiError(getMessage(response), response, json);
    }, ({error}) => {
      throw new ApiError(getMessage(response), response, error);
    });
  }

  throw new ApiError(getMessage(response), response);
}

// Expects a response object, spits the JSON body as a JS object
export function jsonify(response, error = null) {
  if(error) {
    return Promise.reject(error);
  }

  const jsonPromise = parseJsonIfAvailable(response);

  if(jsonPromise === false) {
    throw new ApiError('[jsonify] Received a non-JSON response.', response);
  }

  return jsonPromise;
}

export function parseJsonIfAvailable(response) {
  const contentType = response.headers.get('Content-Type');
  const contentLength = response.headers.get('Content-Length');

  if (ignoredStatusCodes.includes(response.status) || contentLength === 0) {
    return Promise.resolve({json: {}, response});
  }
  if (contentType && contentType.match(/application\/json/)) {
    return response.json()
      .then((json) => { return {json, response}; },
        (error) => { return Promise.reject({error});});
  }
  return false;
}

function getMessage(response) {
  return response.status + ' ' + response.statusText;
}
