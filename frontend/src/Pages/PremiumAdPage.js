import React, { useState } from "react";
import { delay, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Box, Grid } from '@mui/material';
import { Opacity } from "@mui/icons-material";
import Button from '@mui/material/Button';

import CheckIcon from '@mui/icons-material/Check';

import CheckoutForm from "../Components/Payment/CheckoutForm";

const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

function PremiumAd() {
    const MotionGrid = motion(Grid);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        setCheckoutOpen(true);
        // navigate(`/checkout`)
    }
    return (
        <dev>
            <Container>
                <motion.Box
                    initial={{ x: '-100%', y: '-100%' }}
                    animate={{ x: 0, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '600px',
                        height: '600px',
                        backgroundColor: '#c3c9ef',
                        borderRadius: '0  0px  600px 0',
                        zIndex: 0
                    }}
                />
                <motion.Box
                    initial={{ x: '100%', y: '100%' }}
                    animate={{ x: 0, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '400px',
                        height: '400px',
                        backgroundColor: '#c3c9ef',
                        borderRadius: '400px 0 0 0',
                        zIndex: 0
                    }}
                />
                <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                {!checkoutOpen ? (
                    <>

                        <MotionGrid
                            item
                            lg={12}
                            xs={12}
                            initial={{ y: '-20%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            style={{ marginTop: '90px', zIndex: 1 }}
                        >
                            <Typography fontSize={'56px'} fontWeight={'bold'}>Let us help you breeze through your Alberta knowledge exam</Typography>
                        </MotionGrid>

                        <MotionGrid
                            item
                            lg={12}
                            xs={12}
                            initial={{ y: '-30%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            style={{ display: "flex", justifyContent: 'center', marginTop: '40px', zIndex: 1 }}
                        >
                            <Typography fontSize={'20px'} fontWeight={500} sx={{ width: '70%' }}>
                                Simple pricing, no hidden fees. You’ll walk out of the testing centre, feeling like you just took a first-grade spelling test. One-time purchase, not a subscription.
                            </Typography>
                        </MotionGrid>

                        <MotionGrid
                            item
                            lg={12}
                            xs={12}
                            initial={{ y: '0%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            style={{ display: "flex", justifyContent: 'center', marginTop: '40px', zIndex: 1 }}
                        >
                            <img src="https://s.driving-tests.org/cdl-premium/passguarantee-orig.svg" style={{ width: '320px' }} />
                        </MotionGrid>

                        <Grid item lg={12} xs={12} sx={{ display: "flex", justifyContent: 'center', marginTop: '30px', zIndex: 1 }}>
                            <Stack direction={'column'} spacing={1}>
                                <MotionTypography
                                    fontWeight={500}
                                    initial={{ x: '-40%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}
                                >
                                    <CheckIcon sx={{ color: '#007aff', fontSize: '22px', marginRight: '8px' }} />
                                    All 270+ exam-like questions
                                </MotionTypography>
                                <MotionTypography
                                    fontWeight={500}
                                    initial={{ x: '-40%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}
                                >
                                    <CheckIcon sx={{ color: '#007aff', fontSize: '22px', marginRight: '8px' }} />
                                    All 270+ exam-like questions
                                </MotionTypography>
                                <MotionTypography
                                    fontWeight={500}
                                    initial={{ x: '-40%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                    style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}
                                >
                                    <CheckIcon sx={{ color: '#007aff', fontSize: '22px', marginRight: '8px' }} />
                                    All 270+ exam-like questions
                                </MotionTypography>
                            </Stack>
                        </Grid>

                        <Grid item lg={12} xs={12} sx={{ display: "flex", justifyContent: 'center', marginTop: '30px', zIndex: 1 }}>
                            <MotionButton
                                onClick={handleClick}
                                initial={{ y: '50%', opacity: 0 }}
                                animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 1.2 } }}
                                style={{
                                    textTransform: 'capitalize',
                                    fontSize: '16px',
                                    display: 'flex',
                                    borderRadius: "20px",
                                    height: '40px',
                                    width: '230px',
                                    backgroundColor: '#007aff',
                                    marginTop: '10px',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                Get Instant Access
                            </MotionButton>
                        </Grid>

                    </>
                ) : (

                    <Grid lg={12} xs={12}  sx={{ zIndex: 1, marginTop: '150px' }}>
                        <CheckoutForm />
                    </Grid>

                )}
            </Grid>
        </Container>
        </dev >
    );
}

export default PremiumAd;