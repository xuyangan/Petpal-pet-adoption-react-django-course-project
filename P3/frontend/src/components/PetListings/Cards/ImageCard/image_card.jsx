import React from 'react';

function PetCard({ name, status, imageSrc, detailLink, width, height }) {
  const cardStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div className="col-xl-4">
      <div className="card2 w-100 h-100">
        <div className="card-details2">
          <div className="rounded d-flex justify-content-center" style={{ overflow: 'hidden', ...cardStyle }}>
            <img src={imageSrc} alt={name} />
          </div>

          <p className="text-black fs-2 bold">{name}</p>
          <p className="text-body2">Status: {status}</p>
        </div>
        <a href={detailLink} className="btn btn-outline-primary card-button2">More info</a>
      </div>
    </div>
  );
}

export default PetCard;
