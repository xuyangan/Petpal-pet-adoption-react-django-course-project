import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./analytics.css";

const Analytics = () => {
  const [formData, setFormData] = useState({
    tot_pet_listings: 0,
    accepted_pets: 0,
    num_shelters: 0,
    num_seekers: 0,
  });

  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    // Function to animate counting effect
    function countTo(target, elementId, duration) {
      const element = document.getElementById(elementId);
      const start = parseInt(element.textContent, 10);
      const increment = (target - start) / (duration / 16); // 16ms per frame for 60fps

      let current = start;

      function update() {
        current += increment;
        element.textContent = Math.floor(current);

        if (current < target) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target;
        }
      }

      update();
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/analytics/", {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(data);

          // Start counting animations after data is fetched
          countTo(data.tot_pet_listings, 'petListings', 2000);
          countTo(data.accepted_pets, 'adopted', 1500);
          countTo(data.num_shelters, 'shelters', 1500);
          countTo(data.num_seekers, 'seekers', 1500);
        } else {
          console.error("Failed to fetch analytics");
        }
      } catch (error) {
        console.error("Error fetching analytics details", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="container">
      <div className="card mb-3 analytics-card bg-transparent border-0">
        <div className="card-body">
          <div className="card pet-listings mb-3">
            <div className="card-body text-center bg-color-baby-blue-2">
              <p id="petListings" className="big-number display-1">{formData.tot_pet_listings}</p>
              <font size="7" className="stylish-text card-text description">Pet Listings</font>
              <div className="stylish-text">
              <font size="4" className="card-text description">Every day, hundreds of shelters in the Greater Toronto Area are constantly rescuing pets from the streets, as well as recieving pet donations from owners that may not be able to continue taking care of them. </font>
              <font size="4" className="card-text description">PetPal prides itself in achieving the top quality of pets and constantly seeking new shelters to join our one big family</font>
              </div>
            </div>
          </div>

          <div className="card adopted mb-3">
            <div className="card-body text-center bg-color-baby-blue-2">
              <p id="adopted" className="big-number display-1">{formData.accepted_pets}</p>
              <font size="7" className="stylish-text card-text description">Pets Adopted</font>
              <div className="stylish-text">
              <font size="4" className="card-text description">We pride ourselves in having a high success rate of pets getting adopted </font>
              <font size="4" className="card-text description">We always get these pets new homes!!!</font>
              </div>
            </div>
          </div>
          <div className="card shelters mb-3">
            <div className="card-body text-center bg-color-baby-blue-2">
              <p id="shelters" className="big-number display-1">{formData.num_shelters}</p>
              <font size="7" className="stylish-text card-text description">Shelters</font>
              <div className="stylish-text">
              <font size="4" className="card-text description">We are always expanding our family, and we can stress enough how much we've grown!</font>
              <font size="4" className="card-text description">We always get shelters that are as equally motivated as us to rescue pets!!!!</font>
              </div>
            </div>
          </div>
          <div className="card seekers mb-3">
            <div className="card-body text-center bg-color-baby-blue-2">
              <p id="seekers" className="big-number display-1">{formData.num_seekers}</p>
              <font size="7" className="stylish-text card-text description">Seekers</font>
              <div className="stylish-text">
              <font size="4" className="card-text description">WE LOVE YOU SO MUCH!</font>
              <font size="4" className="card-text description">We are constantly growing every day, and it is all thanks to you!</font>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;
