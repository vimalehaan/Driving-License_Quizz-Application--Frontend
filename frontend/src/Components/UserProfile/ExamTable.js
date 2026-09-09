import * as React from 'react';
import { useContext } from 'react';

import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow'

import { styled } from '@mui/material/styles';

import { WhitePaper } from '../Utils/StyledComponents';

import { ExamViewContext } from '../../Pages/UserProfile';

export const CusChip = styled(Chip)(({ result }) => ({

    backgroundColor: result === 'Fail' ? '#ea8f8f' : '#bedd9a',
    "&:hover": {
        backgroundColor: result === 'Fail' ? '#e57373' : '#aed581',
    },
    maxWidth: '60px'
}));

const columns = [
    { id: 'quiz', label: 'Quiz', align: 'center', minWidth: 60 },
    { id: 'difficulty', label: 'Difficulty', align: 'center', minWidth: 60 },
    {
        id: 'date',
        label: 'Date',
        minWidth: 60,
        align: 'center',

    },
    {
        id: 'score',
        label: 'Score',
        minWidth: 60,
        align: 'center',

    },
    {
        id: 'result',
        label: 'Result',
        minWidth: 60,
        align: 'center',

    },
    {
        id: 'fresult',
        label: 'hello',
        minWidth: 60,
        align: 'center',

    },
];

export function createData(quiz, difficulty, date, score, result, type) {

    return { quiz, difficulty, date, score, result, type };
}

export const QuizData = [
    createData('Quiz1', 'Hard', '01/01/2024', 20, false, true),
    createData('Quiz1', 'Easy', '02/01/2024', 50, false, false),
    createData('Quiz3', 'Hardest', '02/01/2024', 40,true, false),
    createData('Quiz4', 'Easy', '04/01/2024', 30, true, true),
    createData('Quiz5', 'Hardest', '04/01/2024', 70,false, false),
    createData('Quiz6', 'Hard', '06/01/2024', 10,true, false),
    createData('Quiz7', 'Easy', '07/01/2024', 80, false, true),
    createData('Quiz8', 'Hard', '08/01/2024', 90,true, true),
];

export default function ExamTable() {
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const {setShowExamView} = useContext(ExamViewContext);

    const handleViewButtonClick = () => {
        setShowExamView(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getRowColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return 'rgba(9, 188, 224, 0.1)'; 
            case 'Hard':
                return 'rgba(159, 105, 213, 0.05)'; 
            case 'Hardest':
                return 'rgba(96, 112, 212, 0.1)'; 
            default:
                return '#FFFFFF'; 
        }
    };




    return (
        <WhitePaper sx={{ padding: '10px', overflow: 'hidden', borderRadius: '20px', maxHeight: '370px' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {QuizData.map((row) => (


                            <TableRow
                                key={row.name}
                                sx={{ borderRadius: '20px', backgroundColor: getRowColor(row.difficulty) }}
                            >
                                <TableCell align="center" >{row.quiz}</TableCell>
                                <TableCell align="center">{row.difficulty}</TableCell>
                                <TableCell align="center">{row.date}</TableCell>
                                <TableCell align="center">{row.score}</TableCell>
                                <TableCell align="center">{row.result}</TableCell>
                                <TableCell align="center">
                                    <CusChip
                                        result={row.result}
                                        clickable
                                        label={row.result === 'pass' ? 'View' : 'Retry'}
                                        onClick={handleViewButtonClick}
                                    />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </WhitePaper>
    );
}