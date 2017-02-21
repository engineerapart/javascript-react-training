const redditUrl = 'https://www.reddit.com/';

const apiMap = {
  home: template`${'redditUrl'}.json`,
  allSubreddits: template`${'redditUrl'}subreddits.json`,
  subReddit: template`${'redditUrl'}r/${'subreddit'}/${'category'}.json`,
  // subRedditTop: template`${'redditUrl'}r/${'subreddit'}/top.json`,
  // subRedditNew: template`${'redditUrl'}r/${'subreddit'}/new.json`,
  // subRedditRising: template`${'redditUrl'}r/${'subreddit'}/rising.json`,
  // subRedditGilded: template`${'redditUrl'}r/${'subreddit'}/gilded.json`,
  // subRedditControlversial: template`${'redditUrl'}r/${'subreddit'}/controversial.json`,
  subRedditAbout: template`${'redditUrl'}r/${'subreddit'}/about.json`,
  subRedditMods: template`${'redditUrl'}r/${'subreddit'}/about/moderators.json`,
  subRedditWiki: template`${'redditUrl'}r/${'subreddit'}/wiki/index.json`,
  subRedditSearch: template`${'redditUrl'}r/${'subreddit'}/search.json`,
  thread: template`${'redditUrl'}r/${'subreddit'}/comments/${'threadId'}.json`,
  user: template`${'redditUrl'}user/${'username'}/.json`,
  userAbout: template`${'redditUrl'}user/${'username'}/about.json`,
  userTrophies: template`${'redditUrl'}user/${'username'}/trophies.json`,
};

function template(strings, ...keys) {
  return (function(...values) {
    values[0].redditUrl = redditUrl;
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function(key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}

export default apiMap;