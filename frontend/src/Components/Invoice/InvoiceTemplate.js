import React, { useRef, useState } from 'react';
import Barcode from 'react-barcode';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material';
import ReactToPrint from 'react-to-print';

function PdfTemplate(props) {
    const ref = useRef();
    const [productName, setProductName] = useState('');
    const [productAmount, setProductAmount] = useState(0);
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [discount, setDiscount] = useState(props.discount);

    // Calculate total amount
    const totalAmount = invoiceItems.reduce((total, item) => total + item.amount, 0);

    return (
        <>
            <div className="parent-container">
                <div className="container" ref={ref}>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2 style={{ color: '#325aa8' }}>INVOICE</h2>
                        </div>
                        <div className="Company col-md-12 text-right">
                            <h4 style={{ color: '#325aa8' }}><strong>CoBit05</strong></h4>
                            <p>(+91) 1234567890</p>
                            <p>sample@gmail.com</p>
                        </div>
                    </div>
                    <br />
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th><h5>Products</h5></th>
                                    <th><h5>Amount</h5></th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="col-md-9">{item.product}</td>
                                        <td className="col-md-3"><i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹ {item.amount}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="text-right">
                                        <p><strong>Total Amount:</strong></p>
                                        <p><strong>Discount:</strong></p>
                                        <p><strong>Payable Amount:</strong></p>
                                    </td>
                                    <td>
                                        <p><strong><i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹ {totalAmount}</strong></p>
                                        <p><strong><i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹ {discount}</strong></p>
                                        <p><strong><i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹ {totalAmount - discount}</strong></p>
                                    </td>
                                </tr>
                                <tr style={{ color: '#F81D2D' }}>
                                    <td className="text-right"><h4><strong>Total:</strong></h4></td>
                                    <td className="text-left"><h4><strong><i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹ {totalAmount - discount}</strong></h4></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12">
                        <p><b>Date:</b> {props.date}</p>
                        <br />
                        <p><b>Name:</b> {props.userName}</p>
                        <p><b>Contact:</b> (+91) {props.userPhone}</p>
                    </div>
                    <div className="barcode-container text-center">
                        <Barcode value={`4n%${props.InvoiceNumber}+ut%`} width={1} height={50} displayValue={false} />
                    </div>
                </div>
            </div>

            <ReactToPrint
                trigger={() => <button>Download</button>}
                content={() => ref.current}
                documentTitle={`INVOICE ${props.InvoiceNumber}`}
            />
        </>
    );
}

export default PdfTemplate;
