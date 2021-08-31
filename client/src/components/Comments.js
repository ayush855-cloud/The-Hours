import React from 'react';
import moment from 'moment';
function Comments({comments}) {
    return comments.length > 0
    ? comments.map((comment) => (
            <div key={comment._id} className='commentSection'>
                <div className='post__header'>
               
                    <div className='post__header__avator'>
                        {comment.userName ? comment.userName[0] : ''}
                    </div>
                    <div className='post__header__userName'>
                        <span>{comment.userName}</span>
                    </div>
                    <div className='comment__body'>{comment.comment}</div>
                </div>
                <span className="timeStamp">{moment(comment.updatedAt).startOf('day').fromNow()}</span>
            </div>
      ))
    : 'No comments';
}

export default Comments
