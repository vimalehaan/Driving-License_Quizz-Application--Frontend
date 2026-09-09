// Footer.js

import { color } from '@mui/system';
import React from 'react';

const Footer = () => {
  return (
    
    <footer style={{ width: '100%', height: '448px', position: 'relative', textAlign: 'center', padding: '100px 0 0 0', boxSizing: 'border-box', background: 'linear-gradient(180deg, #6070D4 0%, #323A6E 100%)',marginTop:'70px', color: 'white' }}>
      <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100px', borderRadius: '40%', background: 'white', transform: 'translateY(-50%)' }}></div>

      {/* Your content goes here */}
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 2 }}>
        {/* Column 1 */}
        <div style={{ flex: 1 }}>
          <h2><b>CoBit05</b></h2>
          <p style={{marginLeft:'80px',width:'400px'}}>cobit is a privately owned website that is not affiliated with or operated by any state government agency.</p>
        </div>

        {/* Column 2 */}
        <div style={{ flex: 1, marginLeft: '250px' }}>
          <h4>Get In Touch</h4>
          <p>Terms and Privacy Policy</p>
          <p>Contact Us</p>
        </div>

        {/* Column 3 */}
        <div style={{ flex: 1, marginRight: '100px' }}>
          <h4>Resources</h4>
          <p>Bill of Sale Template</p>
          <p>VIN Decoder Tool</p>
          <p>Beginner Driver's Guide</p>
          <p>2023 Driving Statistics</p>
        </div>
      </div>

      {/* Horizontal line */}
      <hr style={{ borderTop: '1px solid #ddd', width: '90%', margin: '10px auto', zIndex: 2 }} />

      {/* Copyright section */}
      <div style={{ width: '100%', position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'space-between', zIndex: 2 }}>
        <p style={{ textAlign: 'left', flex: 1,marginLeft:'80px',width:'400px' }}>© Terms and Privacy Policy.</p>
        <p style={{ textAlign: 'right', flex: 1 ,marginRight:'100px'}}>© 2010-2024 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
