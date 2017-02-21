import 'isomorphic-fetch';
import pkg from 'package.json';
// Till we can use Valkyrie...
import { buildUri, checkHttpStatus, jsonify, doRateLimit } from 'api/requestUtils';
import apiMap from './apiMap';

const { REDDIT_NONCE, REDDIT_USERNAME } = process.env;
// Not actually used by the browser's fetch()
const userAgent = `react:com.wizeline.training.${pkg.version}.[${REDDIT_NONCE}] (/u/${REDDIT_USERNAME})`;

function redditClient(options = {}) {
  function getRedditHome({...rest}) {
    const uri = buildUri(apiMap.home({}), { ...rest });
    return execute(uri);
  }

  function getAllSubreddits({...rest}) {
    const uri = buildUri(apiMap.allSubreddits({}), { ...rest });
    return execute(uri);
  }

  function getSubreddit({subreddit, category, ...rest}) {
    const uri = buildUri(apiMap.subReddit({subreddit, category}), { ...rest });
    return execute(uri);
  }

  function getSubredditTop({subreddit, ...rest}) {
    const uri = buildUri(apiMap.subRedditTop({subreddit}), { ...rest });
    return execute(uri);
  }

  function getSubredditNew({subreddit, ...rest}) {
    const uri = buildUri(apiMap.subRedditNew({subreddit}), { ...rest });
    return execute(uri);
  }

  function getSubredditRising({subreddit, ...rest}) {
    const uri = buildUri(apiMap.subRedditRising({subreddit}), { ...rest });
    return execute(uri);
  }

  function getSubredditGilded({subreddit, ...rest}) {
    const uri = buildUri(apiMap.subRedditGilded({subreddit}), { ...rest });
    return execute(uri);
  }

  function getSubredditControversial({subreddit, ...rest}) {
    const uri = buildUri(apiMap.subRedditControversial({subreddit}), { ...rest });
    return execute(uri);
  }

  function getSubredditAbout({subreddit, ...rest}) {
    const uri = buildUri(apiMap.subRedditAbout({subreddit}), { ...rest });
    return execute(uri);
  }

  function getSubredditMods({subreddit, ...rest}) {
    const uri = buildUri(apiMap.subRedditMods({subreddit}), { ...rest });
    return execute(uri);
  }

  function getSubredditWiki({subreddit, ...rest}) {
    const uri = buildUri(apiMap.subRedditWiki({subreddit}), { ...rest });
    return execute(uri);
  }

  function searchSubreddit({subreddit, query, ...rest}) {
    // t = hour, week, month, day, year, all
    // sort = new, top,
    const uri = buildUri(apiMap.subRedditSearch({subreddit}),
                         {q: query, restrict_sr: 'on', sort: 'new', t: 'hour', ...rest});
    return execute(uri);
  }

  function getThreadDetails({subreddit, threadId, ...rest}) {
    // t = hour, week, month, day, year, all
    const uri = buildUri(apiMap.thread({subreddit, threadId}), {...rest});
    return execute(uri);
  }

  function getUserHome({username, ...rest}) {
    // t = hour, week, month, day, year, all
    const uri = buildUri(apiMap.user({username}), {...rest});
    return execute(uri);
  }

  function getUserDetails({username}) {
    // t = hour, week, month, day, year, all
    const uri = buildUri(apiMap.userAbout({username}));
    return execute(uri);
  }

  function getUserTrophies({username}) {
    // t = hour, week, month, day, year, all
    const uri = buildUri(apiMap.userTrophies({username}));
    return execute(uri);
  }

  function execute(uri, headers = {}) {
    return fetch(uri, { headers: getHeaders(headers) })
      .then((response) => {
        doRateLimit(response, options);
        return Promise.resolve(response);
      })
      .then(checkHttpStatus, checkHttpStatus.bind(undefined, null))
      .then(jsonify, jsonify.bind(undefined, null));
  }

  function getHeaders(headers) {
    headers['User-Agent'] = userAgent;
    return new Headers(headers);
  }

  return {
    getRedditHome,
    getAllSubreddits,
    getSubreddit,
    getSubredditTop,
    getSubredditNew,
    getSubredditRising,
    getSubredditGilded,
    getSubredditControversial,
    getSubredditAbout,
    getSubredditMods,
    getSubredditWiki,
    searchSubreddit,
    getThreadDetails,
    getUserHome,
    getUserDetails,
    getUserTrophies,
  }
}

export default redditClient;