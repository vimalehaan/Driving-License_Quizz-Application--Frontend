import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TextField,
  FormControl, InputLabel, Select, MenuItem, Typography, Grid, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const columns = [
  { id: 'userId', label: 'User ID', minWidth: 190 },
  { id: 'action', label: 'Action', minWidth: 100 },
  { id: 'loginTime', label: 'Log In Time', minWidth: 300 },
  { id: 'logoutTime', label: 'Log Out Time', minWidth: 300 },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '80%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: '10px',
  borderColor: 'transparent',
  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  marginBottom: '20px',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  minWidth: 50,
  fontWeight: 'bold',
  backgroundColor: '#6070D4',
  color: 'black',
  borderBottom: 'none',
  padding: '10px 15px',
  margin: 0,
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid black', // Black border for table cells
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  minHeight: '20px',
  fontSize: '0.875rem',
  padding: '0 10px',
  display: 'flex',
  alignItems: 'center',
  lineHeight: '1.2',
  justifyContent: 'space-between',
}));

const UserActivityLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    action: '',
  });

  const fetchLogs = () => {
     fetch('http://localhost:3000/api/activityLogs/logs')
      .then(response => response.json())
      .then(data => {
        setLogs(data);
      })
      .catch(error => {
        console.error('Error fetching logs:', error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterSelect = (columnId, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [columnId]: value,
    }));
  };

  const filteredLogs = logs.filter(log => {
    return Object.keys(filters).every(key => {
      if (filters[key] === '') {
        return true;
      } else {
        return log[key].toLowerCase().includes(filters[key].toLowerCase());
      }
    }) && (
      log.userId.toLowerCase().includes(filter.toLowerCase()) ||
      log.action.toLowerCase().includes(filter.toLowerCase()) ||
      log.loginTime?.toLowerCase().includes(filter.toLowerCase()) ||
      log.logoutTime?.toLowerCase().includes(filter.toLowerCase())
    );
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [filters, filter]);

  const renderFilterSelect = (columnId, label) => (
    <FormControl sx={{ m: 1, minWidth: 100 }}>
      <InputLabel id={`select-${columnId}-label`}>{label}</InputLabel>
      <StyledSelect
        labelId={`select-${columnId}-label`}
        id={`select-${columnId}`}
        value={filters[columnId]}
        onChange={(e) => handleFilterSelect(columnId, e.target.value)}
        autoWidth
        label={label}
        MenuProps={{
          PaperProps: {
            style: {
              maxWidth: 100,
              maxHeight: 150,
              marginTop: 10,
            },
          },
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {getUniqueValues(columnId).map((value, index) => (
          <MenuItem key={index} value={value}>{value}</MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );

  const getUniqueValues = (columnId) => {
    const uniqueValues = new Set();
    logs.forEach(log => uniqueValues.add(log[columnId]));
    return Array.from(uniqueValues);
  };

  const theme = createTheme({
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
    palette: {
      primary: {
        main: '#6070D4',
      },
      secondary: {
        main: '#FF4081',
      },
      background: {
        default: '#f9f9f9',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '90%', padding: '20px', backgroundColor: '#f9f9f9', border: 'none', margin: '0 auto', marginTop: '100px' }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{
            margin: '20px 10px',
            fontWeight: 'bold',
            color: 'transparent',
            backgroundImage: 'linear-gradient(180deg, #6070D4 0%, #323A6E 100%)',
            WebkitBackgroundClip: 'text',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          User Activity Log
        </Typography>

        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ margin: '20px auto', width: '100%' }}>
          <Grid item xs={12} sm={8} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              variant="outlined"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: '#9e9e9e' }} />
                  </InputAdornment>
                ),
                style: { width: '100%' },
              }}
              style={{ boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', borderRadius: '4px', width: '100%' }}
            />
          </Grid>
        </Grid>

        <StyledPaper elevation={3} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <TableContainer sx={{ flexGrow: 1 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell key={column.id} align={column.align}>
                      {column.label}
                      {column.id === 'action' && renderFilterSelect(column.id, column.label)}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((log, index) => (
                    <TableRow
                      key={index}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', transition: 'background-color 0.3s' }}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ borderBottom: '1px solid #e0e0e0', padding: '12px', border: '1px solid black' }} // Black border for table cells
                        >
                          {column.id === 'loginTime' && log.loginTime ? new Date(log.loginTime).toLocaleString() : ''}
                          {column.id === 'logoutTime' && log.logoutTime ? new Date(log.logoutTime).toLocaleString() : ''}
                          {column.id !== 'loginTime' && column.id !== 'logoutTime' && log[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredLogs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
          />
        </StyledPaper>
      </div>
    </ThemeProvider>
  );
};

export default UserActivityLogPage;
