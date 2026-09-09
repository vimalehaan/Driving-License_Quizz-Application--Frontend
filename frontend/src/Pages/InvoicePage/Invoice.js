import React, { useState, useEffect } from 'react';
import axios from 'axios';
import crc32 from 'crc32';
import '../../Invoice.css';
import InvoiceTemplate from '../../Components/Invoice/Invoice';
import { useAuth } from '../../Components/AuthContext_Handle/Auth_Context';

function Invoice() {
  const { userId } = useAuth();
  const [Dates, setDates] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState('');
  console.log(userId)

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/invoice/${userId}`);
      setTransaction(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching transaction');
      console.error('Error fetching transaction:', error);
    }
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  function crc32(input) {
    let hash = 0;
    if (input.length === 0) return hash;
  
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32bit integer
    }
  
    return Math.abs(hash) % 10000;
  }
  
  function encodeTransactionId(transactionId) {
    // Generate a 4-digit number based on the transaction ID
    return crc32(transactionId);
  }

  useEffect(() => {
    if (userId) {
      fetchTransaction();
      console.log("fgfg",transaction)
    }

  }, [userId]);

  return (
    <div>
    {transaction ? (
      <div>
        <InvoiceTemplate 
        date={formatDate(transaction.createdAt)} 
        transaction={transaction} 
        encodedNumber = {encodeTransactionId(transaction._id)}/>
      </div>
    ) : null}
  </div>
    
  );
}

export default Invoice;
