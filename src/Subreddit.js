import React from 'react';
import PostItem from './PostItem';
import redditClient from 'api/redditClient';

function createPostItem(item) {
  const { data } = item;
  const props = {
    title: data.title,
    thumbUrl: data.thumbnail,
    voteCount: data.ups,
    commentCount: data.num_comments,
    createdDate: data.created_utc,
    createdBy: data.author,
    subreddit: data.subreddit,
    threadId: data.name,
    key: data.name,
  };

  return <PostItem {...props} />
}

class Subreddit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    redditClient().getSubreddit({subreddit: 'birdsforscale'})
      .then(({json}) => {
        console.log(json);
        const { data: { children: redditPosts }} = json;
        this.setState({posts: redditPosts});
      }, console.log)
      .catch(console.log);
  }

  render() {
    const { posts = [] } = this.state;

    return <div>
      {posts.map(createPostItem)}
    </div>
  }
}

export default Subreddit;