import React from 'react';
import './topbar.scss';
import linkedin from '../../files/linkedln.svg';
import instagram from '../../files/instagram.svg';
import facebook from '../../files/facebook.svg';

const TopBar = () => (
  <div className="top-bar">
    <div className="container top-bar__content">
      <div></div> 
      <div className="top-bar__social">
        <a href="https://www.linkedin.com/company/aegeebaki/" target='_blank'><img src={linkedin} alt="LinkedIn" /></a>
        <a href="#"><img src={instagram} alt="Instagram" /></a>
        <a href="https://www.facebook.com/aegeebaku"><img src={facebook} alt="Facebook" /></a>
      </div>
    </div>
  </div>
);

export default TopBar;
