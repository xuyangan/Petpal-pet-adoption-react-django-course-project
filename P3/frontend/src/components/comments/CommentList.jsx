// // This component will display a list of comments for a specific shelter
// export default CommentList;
import React, { useState } from 'react';
import ReplyForm from './ReplyForm';

const CommentList = ({ comments, onReplyAdded }) => {
    const [activeReply, setActiveReply] = useState(null);

    const handleReplyClick = (commentId) => {
        setActiveReply(commentId === activeReply ? null : commentId);
    };
    return (
        <div className="card border-0 mb-4 shadow">
            <div className="card-body p-4">
                <h4 className="mb-4 fs-3 pb-2">Comments</h4>

                {comments.map(comment => (
                    <div key={comment.id} className="comment-container d-flex flex-start mt-4">
                        {/* ... existing elements like avatar ... */}
                        <img
                            className="rounded-circle shadow-1-strong me-3"
                            src={comment.user.profilePicture || "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"}
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="comment-content">
                                {/* ... existing elements like username, text ... */}
                                <p className="mb-1">
                                        {comment.user.username}
                                        <span className=" gig-rating text-body-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 1792 1792"
                                      width="15"
                                      height="15"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                                      ></path>
                                    </svg>
                                    {comment.rating}.0
                                    </span>
                                    <span className="small"> - {comment.time_since_posted} </span>
                                    </p>
                                {/* Container for comment text and reply button */}
                                <div className="comment-text-reply">
                                <p className="small mb-0">{comment.text}</p>
                                </div>
                                {comment.replies && comment.replies.map(reply => (
                                    <div key={reply.id} className="mt-2">
                                        {reply.user.username}: {reply.text}
                                        <span className="small"> - {comment.time_since_posted} </span>
                                    </div>
                                ))}
                                <div className="comment-text-reply">
                                        {activeReply !== comment.id && (
                                            <button className="btn  btn-outline-primary btn-sm reply-button" onClick={() => handleReplyClick(comment.id)}>Reply</button>
                                        )}
                                </div>
                                {activeReply === comment.id && (
                                    <ReplyForm 
                                        commentId={comment.id} 
                                        onCommentAdded={() => {
                                            onReplyAdded(comment.id); 
                                            setActiveReply(null);
                                        }}
                                        onCancel={() => setActiveReply(null)}
                                    />
                                )}
                                              
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentList;
