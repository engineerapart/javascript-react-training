import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostItem from './PostItem';

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

function Thread(props) {
  const { params, subredditPosts } = props;
  const { id } = params || {};
  if(!id) {
    return null;
  }

  const item = subredditPosts.posts.find((post) => {
    if(post.data.name === id) {
      return true;
    }
    return false;
  });

  if(!item) {
    return null;
  }

  console.log(item.data.subreddit);

  return (
    <div>
      {createPostItem(item)}
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    doSomethingInteresting: bindActionCreators((a) => {return {type: 'a'}}, dispatch),
  }
}

const mapState = (state) => {
  return {
    subredditPosts: state.subredditPosts,
  }
};

export default connect(mapState, mapDispatch)(Thread);