const initialState = {
  posts: [],
}

function subredditPosts(state = initialState, action) {
  if(action.type === 'SUBREDDIT_POSTS_DOWNLOADED') {
    return {
      posts: action.payload.posts,
    };
  }

  return state;
}

export default subredditPosts;