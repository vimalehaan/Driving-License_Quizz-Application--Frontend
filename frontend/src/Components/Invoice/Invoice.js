import React, { useRef, useState } from 'react';

import "./Invoice.css";
import ReactToPrint from 'react-to-print';

import { Typography } from '@mui/material';
import Button from '@mui/material/Button';




function InvoiceTemplate(props) {
    const ref = useRef();
    const [productName, setProductName] = useState('');
    const [productAmount, setProductAmount] = useState(0);
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [discount, setDiscount] = useState(props.discount);
    
    return (
        <>
            <div ref={ref} className="invoice-box">
                <table cellPadding="0" cellSpacing="0">
                    <tr className="top">
                        <td colSpan="2">
                            <table>
                                <tr>
                                    <td className="title">

                                        <Typography variant="h2" component="div" className="brand" sx={{ marginRight: 'auto', marginLeft: '20px' }}>
                                            <span style={{ color: '#09BCE0', fontWeight: 'bold' }}>C</span>
                                            <span style={{ color: '#323A6E', fontWeight: 'bold' }}>oBit</span>
                                        </Typography>
                                       
                                    </td>
                                    <td>
                                        Invoice #: {props.encodedNumber}<br />
                                        Created: {props.date}<br />
                                        {/* Due: February 1, 2023 */}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr className="information">
                        <td colSpan="2">
                            <table>
                                <tr>
                                    <td>
                                        CoBit, Inc.<br />
                                        12345 Molpe Road,<br />
                                        Katubedda, Moratuwa.
                                    </td>
                                    <td>
                                       
                                        {props.transaction.userDetails.name}<br />
                                        {props.transaction.userDetails.email}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr className="heading">
                        <td>Payment Method</td>
                        <td>Card</td>
                    </tr>

                    <tr className="details">
                        <td>Card</td>
                        <td>VISA</td>
                    </tr>

                    <tr className="heading">
                        <td>Item</td>
                        <td>Price</td>
                    </tr>

                    <tr className="item">
                        <td>Premium Full Access</td>
                        <td>{props.transaction.amountTotal} CAD</td>
                    </tr>

                    {/* <tr className="item">
                        <td>Hosting (3 months)</td>
                        <td>$75.00</td>
                    </tr>

                    <tr className="item last">
                        <td>Domain name (1 year)</td>
                        <td>$10.00</td>
                    </tr> */}

                    <tr className="total">
                        <td></td>
                        <td>Total: {props.transaction.amountTotal} CAD</td>
                    </tr>
                </table>
            </div>
            <ReactToPrint
                trigger={() => <Button sx={{ color: 'white', backgroundColor: '#6070d4', borderRadius:" 20px", 
                    ":hover":{
                        color: 'white', backgroundColor: '#6070d4'
                    }
                }}>Download</Button>}
                content={() => ref.current}
                documentTitle={`INVOICE ${props.encodedNumber}`}
            />
            <Button href='/carexamdb' sx={{ color: 'white', backgroundColor: '#6070d4', borderRadius:" 20px", marginLeft: '10px',
                    ":hover":{
                        color: 'white', backgroundColor: '#6070d4'
                    }
                }}>Go to Home</Button>
        </>
    );
};

export default InvoiceTemplate;
