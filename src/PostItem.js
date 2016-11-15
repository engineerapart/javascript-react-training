import React from 'react';
import './PostItem.css';

function PostItem(props) {
  const { title, thumbUrl, voteCount, commentCount,
          createdDate, createdBy, subreddit, threadId } = props;
  return (
    <div className='post'>
      <div className='post-item'>
        <div className='post-item_header'>
          <div className='post-item_thumb'>
            <img src={thumbUrl} className='post-item_thumb--img' alt='Thread thumbnail' />
          </div>
          <div className='post-item_createdinfo'>
            <span className='post-item_createdinfo--by'>{createdBy}</span>
            <span className='post-item_createdinfo--date'>{createdDate}</span>
            <span className='post-item_createdinfo--subreddit'>To {subreddit}</span>
          </div>
        </div>
        <div className='post-item_body'>
          <span className='post-item_body--title'>{title}</span>
          <div className='post-item_body--jumplinks'>
            <span className='post-item_body--comments'>{commentCount} comments</span>
            <span className='post-item_body--votes'>{voteCount} votes</span>
          </div>
          <div className='post-item_body--jumplinks'>
            <a className='post-item_body--jumplinks-commentlink' href={`/comment/${threadId}`}>Comment</a>
            <a className='post-item_body--jumplinks-sharelink' href='#'>Share</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;