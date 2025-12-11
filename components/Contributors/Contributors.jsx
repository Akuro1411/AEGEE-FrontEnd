import React from 'react';
import contributor1 from '../../files/partner-1.webp';
import contributor2 from '../../files/partner-2.webp';
import contributor3 from '../../files/partner-3.webp';
import contributor4 from '../../files/partner-4.webp';
import contributor5 from '../../files/partner-5.webp';
import contributor6 from '../../files/partner-6.webp';

const Contributors = () => {
  const contributors = [contributor1, contributor2, contributor3,contributor4, contributor5,contributor6];

  return (
    <div className="contributors-wrapper">
      <div className="contributors-track">
        {contributors.concat(contributors).map((src, i) => (
          <img key={i} src={src} alt={`contributor-${i}`} />
        ))}
        {contributors.concat(contributors).map((src, i) => (
          <img key={i + 100} src={src} alt={`contributor-${i + 100}`} />
        ))}
      </div>
    </div>
  );
};

export default Contributors;
