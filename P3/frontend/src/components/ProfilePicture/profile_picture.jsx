import React from 'react';

const ProfilePicture = ({ profilePicture, dimesion }) => {
    return (
        <div className="profile-container">
            <img
                src={profilePicture}
                alt="hugenerd"
                width={dimesion}
                height={dimesion}
                class="rounded-circle"
            />
        </div>);
}
export default ProfilePicture;