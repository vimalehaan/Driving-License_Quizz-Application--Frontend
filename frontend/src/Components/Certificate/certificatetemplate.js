import React from 'react';
import './CertificateTemp.css';

const Certificatetemplate = ({ recipientName, courseName, completionDate }) => {
  return (
    <div className="certificate-template">
      <div className="certificate-header">
        <h2>Certificate of Achievement</h2>
      </div>
      <div className="certificate-body">
        <p>This is to certify that</p>
        <h2>{recipientName}</h2>
        <p>has successfully completed</p>
        <h2>{courseName}</h2>
        <p>on </p>
        <p> {completionDate}</p>
      </div>
      <div className="certificate-footer">
        <div className="left-section">
          <div className="date">
            <p>Date</p>
            <p>{completionDate}</p>
          </div>
        </div>
        <div className="center-section">
          <div className="seal">
            <img src="../images/seal.png" alt="Seal" />
          </div>
        </div>
        <div className="right-section">
          <div className="signature">
            <p>Signature</p>
            <img src="../images/signature.png" alt="Signature" />
          </div>
        </div>
      </div>
      <div className='Bar'>
         <p> CoBit 05</p>
      </div>
    </div>
  );
};

export default Certificatetemplate;
