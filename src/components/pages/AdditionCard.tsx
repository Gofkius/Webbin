import React from 'react';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  logoColor: string;
  logoIcon?: string;
};

const AdditionCard = ({ title, description, imageUrl, logoColor, logoIcon }: Props) => {
  return (
    <div className="addition-card">
      <div className="addition-card-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="addition-card-footer">
        <div className="addition-card-logo" style={{ backgroundColor: logoColor }}>
          {logoIcon && <img src={logoIcon} alt={`${title} logo`} />}
        </div>
        <div className="addition-card-info">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionCard;
