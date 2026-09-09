import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Box, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';

import TransactionGraph from './TransactionGraph';
import SideBar from '../Admin/SideBar';
import { WhitePaper } from '../Utils/StyledComponents';

import AdminNavBar from '../Utils/AdminNavBar';

import VerifiedIcon from '@mui/icons-material/Verified';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#7380d9",
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    border: 0,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.text.primary,
    border: 0
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:3001/transaction');
        const data = await response.json();
        setTransactions(data);

        const total = data.reduce((sum, transaction) => sum + transaction.amountTotal, 0);
        setTotalIncome(total);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
<AdminNavBar />

      <Container sx={{ justifyContent: 'center', marginTop: '150px' }}>



       

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={3}
          sx={{ }}
        >
          <Grid item lg={3} xs={3}>

            <WhitePaper sx={{ width: '75%' }}>
              <Typography textAlign={'left'} variant='h5'>
                Income
              </Typography>
              <Typography textAlign={'left'} variant='h4' fontWeight={700} sx={{ margin: '15px 0 0 0', color: '#4b5cce' }}>
                {totalIncome} CAD
              </Typography>
              <Typography textAlign={'left'} fontSize={'16px'} fontWeight={500} sx={{ margin: '5px 0 0 0' }}>
                As of {formatDate(new Date())}
              </Typography>
            </WhitePaper>


          </Grid>



          <Grid item lg={9} xs={9} sx={{}}>
            <TableContainer component={Paper} sx={{ borderRadius: '20px', maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Created At</StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Amount Total</StyledTableCell>
                    <StyledTableCell align="center">Currency</StyledTableCell>
                    {/* <StyledTableCell align="center">Payment</StyledTableCell> */}
                    <StyledTableCell align="center">Payment</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((transaction) => (
                      <StyledTableRow key={transaction._id}>
                        <StyledTableCell component="th" scope="row">
                          {formatDate(transaction.createdAt)}
                        </StyledTableCell>
                        <StyledTableCell align="center">{transaction.userDetails.name}</StyledTableCell>
                        <StyledTableCell align="center">{transaction.userDetails.email}</StyledTableCell>
                        <StyledTableCell align="center">{transaction.amountTotal}</StyledTableCell>
                        <StyledTableCell align="center">{transaction.currency}</StyledTableCell>
                        <StyledTableCell align="center">
                          <Chip color="success" icon={<VerifiedIcon />} label= {transaction.paymentStatus} />

                         </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[8, 25, 100]}
              component="div"
              count={transactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>

        </Grid>



      </Container>
    </div>
  );
};

export default TransactionTable;
