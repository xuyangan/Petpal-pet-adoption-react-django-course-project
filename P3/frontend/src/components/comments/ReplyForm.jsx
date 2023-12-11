import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import '../../style.css';

const ReplyForm = ({commentId, onCommentAdded, onCancel }) => {
    const [reply, setReply] = useState('');
    const { authToken } = useContext(AuthContext);
    const { sheltername } = useParams();

    const [error, setError] = useState('');

    const validateReply = (text) => {
        if (!text.trim()) {
            return "Reply cannot be empty.";
        } else if (text.length > 125) {
            return "Comment cannot exceed 125 characters.";
        }
        return "";
    };

    const handleReplyChange = (e) => {
        const text = e.target.value;
        setReply(text);

        const validationError = validateReply(text);
        setError(validationError);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationError = validateReply(reply);
        if (validationError) {
            setError(validationError);
            document.getElementById('textAreaExample').focus();
            return; 
        }

        fetch(`http://localhost:8000/comments/${sheltername}/${commentId}/replies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ text: reply })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            onCommentAdded(data);
            setReply('');
        })
        .catch(error => console.error('Error posting reply', error));
    };
    const handleCancel = () => {
        setReply('');
        onCancel(); // Call the onCancel function passed from the parent component
    };

    return (
        <form onSubmit={handleSubmit} className="card-footer bg-white m-2" noValidate>
            <div className="d-flex flex-start w-100">
                <div className="form-outline w-100">
                    <textarea
                          className={`form-control ${error ? 'is-invalid' : ''}`}
                        placeholder="Write your reply here..."
                        rows="3"
                        style={{ background: '#fff' }}
                        value={reply}
                        onChange={handleReplyChange}
                    ></textarea>
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
            </div>
            <div className="float-end mt-2 pt-1">
                <button type="submit" className="btn btn-primary btn-sm">
                    Post reply
                </button>
                <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleCancel} 
                >
                      Cancel
                    </button>
            </div>
        </form>
    );
};

export default ReplyForm;
