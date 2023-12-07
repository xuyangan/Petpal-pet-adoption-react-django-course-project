import React, { useState, useContext, useEffect } from 'react';
import CommentForm from '../../components/comments/CommentForm';
import CommentList from '../../components/comments/CommentList';
import { AuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const { authToken } = useContext(AuthContext);
    const { sheltername } = useParams();

    const fetchComments = () => {
        fetch(`http://localhost:8000/comments/${sheltername}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const sortedComments = data.results.sort((a, b) => {
                return new Date(b.create_time) - new Date(a.create_time);
            });
            setComments(sortedComments);
        })
        .catch(error => console.error('Error fetching comments', error));
    };

    useEffect(() => {
        fetchComments();
    }, [sheltername, authToken]);

    const handleCommentAdded = (newComment) => {
        setComments(prevComments => [newComment, ...prevComments]);
    };

    const handleReplyAdded = (commentId) => {
        console.log("Reply added to comment ID:", commentId); // For debugging
        fetchComments(); // Re-fetch comments to include the new reply
    };

    return (
        <div>
            <h2>Shelter Details</h2>
            <CommentList comments={comments} onReplyAdded={handleReplyAdded} />
            <CommentForm onCommentAdded={handleCommentAdded} />
        </div>
    );
};

export default CommentSection;
