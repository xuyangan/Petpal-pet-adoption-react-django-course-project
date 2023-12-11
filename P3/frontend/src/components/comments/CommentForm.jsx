// This component allows users to post new comments
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import '../../style.css';


const CommentForm = ({ sheltername, onCommentAdded }) => {
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(0);  // State for rating
    const { authToken } = useContext(AuthContext);
    const [error, setError] = useState('');

    const validateComment = (text) => {
        if (!text.trim()) {
            return "Comment cannot be empty.";
        } else if (text.length > 125) {
            return "Comment cannot exceed 125 characters.";
        }
        return "";
    };

    const handleCommentChange = (e) => {
        const text = e.target.value;
        setCommentText(text);

        const validationError = validateComment(text);
        setError(validationError);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const validationError = validateComment(commentText);
        if (validationError) {
            setError(validationError);
            document.getElementById('textAreaExample').focus();
            return; 
        }

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
            setRating(0);
            setError('');
            console.log("New comment data:", data);
        })
        .catch(error => console.error('Error posting comment', error));
    };

    return (
        <form onSubmit={handleSubmit} className="card-footer bg-white m-2" noValidate>

            <div className="d-flex flex-start w-100">
                {/* Text Area */}
                <div className="form-outline comment-form-textarea">
                    <textarea
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        id="textAreaExample"
                        placeholder="Write your comment here..."
                        rows="4"
                        style={{ background: '#fff' }}
                        value={commentText}
                        onChange={handleCommentChange}
                    ></textarea>
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
                {/* Rating Dropdown */}
                <div className="form-outline comment-form-rating" style={{ width: '150px' }}> 
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
    onCommentAdded: () => {}  
};

export default CommentForm;



