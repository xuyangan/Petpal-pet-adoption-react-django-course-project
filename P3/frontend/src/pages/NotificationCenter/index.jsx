import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const NotificationCenter = () => {
    const [notifications, setNotifications] = useState([]);
    const [showRead, setShowRead] = useState(false);
    const { authToken } = useContext(AuthContext);
    const [currentPageUrl, setCurrentPageUrl] = useState('http://localhost:8000/notifications/');
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [isReadFilter, setIsReadFilter] = useState(false);

    const BASE_NOTIFICATIONS_URL = 'http://localhost:8000/notifications/';

    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
    
        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    };
    const handleShowReadToggle = () => {
        setIsReadFilter(prevIsReadFilter => !prevIsReadFilter);
        setCurrentPageNumber(1);
    };
    

    const fetchNotifications = () => {
        const queryParams = new URLSearchParams();
        queryParams.set('page', currentPageNumber);
        queryParams.set('is_read', isReadFilter);
        const fetchUrl = `${BASE_NOTIFICATIONS_URL}?${queryParams.toString()}`;
    
        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setNotifications(data.results);
            setNextPageUrl(data.next);
            setPrevPageUrl(data.previous);
        })
        .catch(error => console.error('Error fetching notifications', error));
    };

    const markAsRead = (notificationId) => {
        fetch(`http://localhost:8000/notifications/${notificationId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ is_read: true })
        })
        .then(() => fetchNotifications(currentPageUrl))
        .catch(error => console.error('Error updating notification', error));
    };

    const markAsUnread = (notificationId) => {
        fetch(`http://localhost:8000/notifications/${notificationId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ is_read: false })
        })
        .then(response => response.json())
        .then(data => {
            // console.log("Updated notification:", data);
            fetchNotifications(currentPageUrl);
        })
        .catch(error => console.error('Error updating notification', error));
    };
    
    const deleteNotification = (notificationId) => {
        fetch(`http://localhost:8000/notifications/${notificationId}/removal/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(() => fetchNotifications(currentPageUrl))
        .catch(error => console.error('Error deleting notification', error));
    };


    function renderNotificationCard(notification, index) {

        let linkPath = notification.related_link;
        if (linkPath.includes('accounts')) {
            linkPath = linkPath.replace('/accounts', '');
        }

        return (
        <div key={notification.id} className="card baby-blue-4 default-shadow">
            <div className="card-header" id={`heading${index}`}>
            <h2 className="mb-0">
                <button className="btn btn-link btn-block text-left text-black" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                    {notification.message.split(":")[0]} - {timeSince(notification.created_at)} ago
                </button>
                </h2>
            </div>
            <div id={`collapse${index}`} className="collapse" aria-labelledby={`heading${index}`} data-parent="#notificationAccordion">
                <div className="card-body">
                    <div>
                        {notification.message}
                    </div>
                    
                    <div className="notification-card-actions">
                    
                    <Link to={linkPath}>View Details</Link>
                        {notification.is_read ? (
                        <button onClick={() => markAsUnread(notification.id)} className="btn btn-secondary btn-sm">Mark as Unread</button>
                    ) : (
                        <button onClick={() => markAsRead(notification.id)} className="btn btn-primary btn-sm">Mark as Read</button>
                    )}
                    <button onClick={() => deleteNotification(notification.id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )}

    useEffect(() => {
        fetchNotifications();
    }, [currentPageNumber, isReadFilter, authToken]);
    
    const handleNextPage = () => {
        if (nextPageUrl) {
            setCurrentPageNumber(currentPageNumber + 1);
        }
    };
    
    const handlePrevPage = () => {
        if (prevPageUrl) {
            setCurrentPageNumber(currentPageNumber - 1);
        }
    };
        
    return (
        <div className="container my-3">
            <h1 className="text-center mb-5">Notifications</h1>
            <button onClick={handleShowReadToggle} className="btn btn-primary">
                {isReadFilter ? 'Show Unread' : 'Show Read'}
            </button>

            <div id="notificationAccordion">
                {notifications.map((notification, index) => renderNotificationCard(notification, index))}
            </div>
            <div className="d-flex justify-content-between">
                {prevPageUrl && <button className="btn custom-button" onClick={handlePrevPage}>Previous</button>}
                <div></div>
                {nextPageUrl && <button className="btn custom-button" onClick={handleNextPage}>Next</button>}
            </div>

        </div>
    );    
};

export default NotificationCenter;
