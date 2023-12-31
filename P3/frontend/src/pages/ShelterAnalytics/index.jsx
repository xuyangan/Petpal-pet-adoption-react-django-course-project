import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./shelter_analytics.css";

const ShelterAnalytics = ({ sheltername }) => {
  const [formData, setFormData] = useState({
    num_pet_listings: 0,
    accepted_pets: 0,
    creation_time: 0,
  });

  const { authToken } = useContext(AuthContext);

  // Function to convert timestamp to human-readable format
  const timeAgo = (timestamp) => {
    const currentDate = new Date();
    const updatedDate = new Date(timestamp);
    const timeDifference = currentDate - updatedDate;
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }
  };

  // Function to animate counting effect for time since joined

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/shelter_analytics/${sheltername}/`, {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(data);

          const joinedTimestamp = new Date(data.creation_time).getTime();
        } else {
          console.error("Failed to fetch shelter analytics");
        }
      } catch (error) {
        console.error("Error fetching shelter analytics details", error);
      }
    };

    fetchData();
  }, [authToken, sheltername]); // Include authToken as a dependency to update analytics when the token changes

  return (
      <div className="analytics-card bg-transparent border-0 shadow">
        <div className="card-body">
          {/* Adjust the content based on the analytics you want to display */}
          <div className="card pet-listings mb-3">
            <div className="card-body text-center bg-color-baby-blue-1">
              <p id="petListings" className="big-number display-1">{formData.num_pet_listings}</p>
              <font size="7" className="stylish-text card-text description">Pet Listings</font>
              <p id="adopted" className="big-number display-1">{formData.accepted_pets}</p>
              <font size="7" className="stylish-text card-text description">Accepted pets</font>
              <p id="joinedTime" className="big-number display-1">{timeAgo(formData.creation_time)}</p>
              <font size="7" className="stylish-text card-text description"> since joined</font>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ShelterAnalytics;
