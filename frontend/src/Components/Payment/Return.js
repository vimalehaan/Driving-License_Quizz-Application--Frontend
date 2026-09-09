import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Invoice from '../../Pages/InvoicePage/Invoice';
import Button from '@mui/material/Button';


const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    const fetchData = async () => {
      try{
        const response = await axios.get(`http://localhost:3001/session-status?session_id=${sessionId}`);
        setStatus(response.data.status);
        setCustomerEmail(response.data.customer_email);
      } catch (error) {
        console.error('errrrror')
      }
    };
    fetchData();
  }, []);

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <section id="success">
        
          <Invoice />

          
        
      </section>
    );
  }

  return null;
};

export default Return;
