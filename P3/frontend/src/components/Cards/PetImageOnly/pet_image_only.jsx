import React from 'react';

function PetImageOnly({ name, imageSrc, width, height }) {
  const cardStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div>
      <div className="card2 w-100 h-100">
          <div className="rounded d-flex justify-content-center" style={{ overflow: 'hidden', ...cardStyle }}>
            <img src={imageSrc} alt={name} />
          </div>
        </div>
      </div>
  );
}

export default PetImageOnly;
