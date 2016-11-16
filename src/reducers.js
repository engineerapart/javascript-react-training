const initialState = {
  posts: [],
  homePosts: [],
}

function subredditPosts(state = initialState, action) {
  if(action.type === 'SUBREDDIT_POSTS_DOWNLOADED') {
    return {
      posts: action.payload.posts,
    };
  }

  if(action.type === 'REDDIT_HOME_POSTS_DOWNLOADED') {
    return {
      homePosts: action.payload.posts,
    }
  }

  return state;
}

export default subredditPosts;