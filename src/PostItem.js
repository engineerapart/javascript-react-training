import React from 'react';

function PostItem(props) {
  const { title, thumbUrl, voteCount, commentCount, createdDate, createdBy, subreddit } = props;
  return (
    <div className='post'>
      <div className='post-item'>
        <div className='post-item_votes'>
          <span className='post-item_votes--text'>{voteCount}</span>
        </div>
        <div className='post-item_thumb'>
          <img src={thumbUrl} className='post-item_thumb--img' alt='Thread thumbnail' />
        </div>
        <div className='post-item_body'>
          <div className='post-item_body--title'>
            <span>{title}</span>
          </div>
          <div className='post-item_body--data'>
            <span className='post-item_body--data--age'>{createdDate}</span>
            <span className='post-item_body--data--createdby'>{createdBy}</span>
            <span className='post-item_body--data--subreddit'>{subreddit}</span>
          </div>
          <div className='post-item_body--jumplinks'>
            <span className='post-item_body--jumplinks-commentcount'>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;