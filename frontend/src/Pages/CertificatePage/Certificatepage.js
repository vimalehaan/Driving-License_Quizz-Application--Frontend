import React, { useEffect, useState, useRef } from 'react';
import CertificateTemplate from '../../Components/Certificate/certificatetemplate';
import axios from 'axios';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import { saveAs } from "file-saver";
import NavBarTop from '../../Components/Utils/NavBarTop';
import Footer from '../../Components/Utils/Footer';
import '../../App.css';

const Certificate = ({ recipientName, courseName, completionDate, recipientEmail }) => {
    const [certificateAppeared, setCertificateAppeared] = useState(false);
    const [attemptDetails, setAttemptDetails] = useState(null);

    const componentRef = useRef();

    useEffect(() => {
        const fetchAttemptDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/attempts?email=${recipientEmail}`);
                setAttemptDetails(response.data);
            } catch (error) {
                console.error('Error fetching attempt details:', error);
            }
        };

        fetchAttemptDetails();
    }, [recipientEmail]);

    // Function to handle PDF generation and sending to backend
    const handleGeneratePDF = async () => {
        try {
            const data = { recipientName, courseName, completionDate,recipientEmail };
            await axios.post("http://localhost:3001/certificates/generate/pdf", data);

            const getPdf = await axios.get("http://localhost:3001/certificates/fetch/pdf", { responseType: "blob" });
            const pdfBlob = new Blob([getPdf.data], { type: 'application/pdf' });
            saveAs(pdfBlob, "Certificate.pdf");

            await axios.post("http://localhost:3001/certificates/send/pdf", { recipientEmail });

        } catch (error) {
            console.error('Error handling PDF:', error);
            alert('Failed to generate or send certificate. Please try again.');
        }
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Certificate_${recipientName}`,
    });

    return (
        <>
            <NavBarTop />
            <div className={`certificate-container ${certificateAppeared ? 'certificate-appeared' : ''}`}>
                <h1 style={{ color: '#49108B', fontFamily: 'sans-serif', fontSize: '50px', textAlign: 'center' }}>Congratulations!</h1>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)', padding: '20px', borderRadius: '10px', marginBottom: '20px', width: 'fit-content' }} ref={componentRef}>
                        <CertificateTemplate recipientName={recipientName} courseName={courseName} completionDate={completionDate} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={() => {
                            handlePrint();
                            handleGeneratePDF(); // Call handleGeneratePDF after printing
                        }}
                        variant="outlined"
                        startIcon={<DownloadIcon style={{ fill: 'url(#gradient1)', fontSize: '30px' }} />}
                        sx={{
                            border: '2px solid #6070D4',
                            color: '#6070D4',
                            '&:hover': {
                                border: '2px solid #323A6E',
                                color: '#323A6E',
                            },
                        }}
                    >
                        <b>Download</b>
                    </Button>
                </div>
            </div>
            <Footer />
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%">
                        <stop offset="0%" stopColor="#6070D4" />
                        <stop offset="100%" stopColor="#323A6E" />
                    </linearGradient>
                </defs>
            </svg>
        </>
    );
};

export default Certificate;
