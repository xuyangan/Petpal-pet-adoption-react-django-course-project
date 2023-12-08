import { Link } from "react-router-dom";

function ShelterCard({username, shelterName, email, phone, location, missionStatement}) {
    const url = "http://localhost:3000/profile/shelter/" + username;

    return (
        <div className="card" key={username}>
            <div className="card-body">
                <h5 className="card-title">{shelterName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{missionStatement}</h6>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Phone: {phone}</li>
                <li className="list-group-item">Location: {location}</li>
            </ul>
            <div className="card-body text-center">
                <Link to={url} className="btn btn-outline-primary">More Info</Link>
            </div>
        </div>
    )
}

export default ShelterCard;