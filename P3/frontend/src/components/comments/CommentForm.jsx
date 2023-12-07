// This component allows users to post new comments
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import '../../style.css';

const CommentForm = ({ sheltername, onCommentAdded }) => {
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);  // State for rating
    const { authToken } = useContext(AuthContext);
    // const { sheltername } = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            text: commentText,
            rating: rating  // Include rating in the payload
        };

        fetch(`http://localhost:8000/comments/` + sheltername+ "/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            onCommentAdded(data);
            setCommentText('');
            setRating(0);  // Reset rating
            console.log("New comment data:", data);
        })
        .catch(error => console.error('Error posting comment', error));
    };

    return (
        <form onSubmit={handleSubmit} className="card-footer bg-white m-2">

            <div className="d-flex flex-start w-100">
                {/* Text Area */}
                <div className="form-outline comment-form-textarea">
                    <textarea
                        className="form-control"
                        id="textAreaExample"
                        placeholder="Write your comment here..."
                        rows="4"
                        style={{ background: '#fff' }}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                </div>

                {/* Rating Dropdown */}
                <div className="form-outline comment-form-rating" style={{ width: '150px' }}> {/* Adjust width as needed */}
                    <select
                        className="form-control"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value="0">Rating: 0</option>
                        <option value="1">Rating: 1</option>
                        <option value="2">Rating: 2</option>
                        <option value="3">Rating: 3</option>
                        <option value="4">Rating: 4</option>
                        <option value="5">Rating: 5</option>
                    </select>
                </div>
            </div>
            <div className="float-end mt-2 pt-1">
                <button type="submit" className="btn btn-primary btn-sm">
                    Post comment
                </button>
            </div>
        </form>

    );
};

CommentForm.defaultProps = {
    onCommentAdded: () => {}  // Default to a no-op function
};

export default CommentForm;



