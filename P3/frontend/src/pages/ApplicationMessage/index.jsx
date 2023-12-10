import React, { useState, useEffect, useContext,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Chat.css'
import { IdContext } from '../../contexts/IdContext';

const ApplicationMessages = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const { authToken } = useContext(AuthContext);
    const { application_id } = useParams();
    const { id } = useContext(IdContext);

    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";

        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";

        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";

        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";

        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";

        return Math.floor(seconds) + " seconds ago";
    };

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    const fetchMessages = (url = `http://localhost:8000/applications/${application_id}/messages/?page=${currentPage}`) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            const processedMessages = data.results.map(message => ({
                ...message,
                isCurrentUserSender: message.sender_name === id
            }));
            setMessages(processedMessages);
            setNextPageUrl(data.next);
            setPrevPageUrl(data.previous);
        })
        .catch(error => console.error('Error fetching messages', error));
    };

    useEffect(() => {
        fetchMessages(); // Initial fetch
    }, [application_id, authToken, id]); 

    

    // Function to handle sending a new message
    const sendMessage = () => {
        fetch(`http://localhost:8000/applications/${application_id}/message/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: newMessage })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setNewMessage('');
            fetchMessages(); // Fetch the updated messages list
        })
        .catch(error => console.error('Error:', error));
    };    

    const handleNextPage = () => {
        if (nextPageUrl) {
            fetchMessages(nextPageUrl);
        }
    };
    
    const handlePrevPage = () => {
        if (prevPageUrl) {
            fetchMessages(prevPageUrl);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h4>Chat for application {application_id}</h4>
            </div>
            <div className="chat-content">
                {messages.map(message => (
                    <div key={message.id} className="message-container">
                        <div className={`message-info ${message.isCurrentUserSender ? 'align-right' : ''}`}>
                            <span className="sender-name">{message.sender_name}</span>
                            <span className="message-time">{timeSince(message.timestamp)}</span>
                        </div>
                        <div className={`message ${message.isCurrentUserSender ? 'sent' : 'received'}`}>
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination-controls">
                {prevPageUrl && <button onClick={handlePrevPage} className="btn btn-outline-primary">Previous</button>}
                {nextPageUrl && <button onClick={handleNextPage} className="btn btn-outline-primary">Next</button>}
            </div>
            <div className="chat-input">
                <input 
                    type="text" 
                    placeholder="Type here..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage} className="btn btn-primary">Send</button>
            </div>
        </div>
    );        
};


export default ApplicationMessages;
