import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { CusButtonPurp } from '../../Utils/StyledComponents';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DeleteBox from './DeleteBox';
import AddQuiz from './addquiz';
import UpdateBox from './UpdateBox'; // Make sure to import UpdateBox
import axios from 'axios';
import Answerbox from './Answerbox';

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openUpdateBox, setOpenUpdateBox] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [updatedAnswers, setUpdatedAnswers] = useState([]); // Make sure this is defined
  const [questionBox, setQuestionBox] = useState({ open: false, data: null });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/questions/listOfQuestions');
        setRows(response.data.map((question, index) => ({
          id: question._id,
          tableId: index + 1,
          Questions: question.question_text,
          difficulty: question.difficulty,
          questionType: question.questionType ? 'Car' : 'Commercial Vehicle',
          answers: question.answers
        })));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.map(id => {
      const selectedRow = rows.find(row => row.id === id);
      return {
        id: selectedRow.id,
        questionText: selectedRow.Questions,
        answers: selectedRow.answers,
        tableId: selectedRow.tableId // Include tableId in selectedRows
      };
    }));
  };

  const handleQuiz = () => {
    setOpenQuiz(true);
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await Promise.all(selectedRows.map(async (selectedRow) => {
        await axios.delete(`http://localhost:3001/questions/deleteQuestion/${selectedRow.id}`);
      }));

      const remainingRows = rows.filter(row => !selectedRows.some(selected => selected.id === row.id));
      setRows(remainingRows);
      setSelectedRows([]);
      setOpen(false);
    } catch (error) {
      console.error('Error deleting questions:', error);
    }
  };

  const handleUpdate = async (questionId, updatedQuestion, updatedAnswers, quizType, difficulty) => {
    if (selectedRows.length === 1) {
      try {
        const updatedRow = {
          question_text: updatedQuestion,
          difficulty: difficulty,
          questionType: quizType,
          answers: updatedAnswers.map((answer_text, index) => ({
            answer_text,
            _id: selectedRows[0].answers[index]?._id || undefined
          }))
        };
  
        const response = await axios.put(`http://localhost:3001/questions/updateQuestion/${questionId}`, updatedRow);
  
        if (response.status === 200) {
          const updatedRows = rows.map(row =>
            row.id === selectedRows[0].id ? { ...row, ...updatedRow } : row
          );
  
          setRows(updatedRows);
          setSelectedRows([]);
          setOpenUpdateBox(false);
  
          // Fetch updated questions after successful update
           // Call fetchQuestions to update the table
        } else {
          console.error('Failed to update the question:', response);
        }
      } catch (error) {
        console.error('Error updating the question:', error);
      }
    }
  };
    
  const handleAnswerChange = (event, index) => {
    const updatedAnswerList = [...updatedAnswers];
    updatedAnswerList[index] = event.target.value;
    setUpdatedAnswers(updatedAnswerList);
  };

  const handleQuestionClick = (questionId) => {
    const selectedQuestion = rows.find(row => row.id === questionId);
    setQuestionBox({ open: true, data: selectedQuestion });
  };

  const handleCloseQuestionBox = () => {
    setQuestionBox({ open: false, data: null });
  };

  const columns = [
    { field: 'tableId', headerName: 'ID', width: 250 },
    {
      field: 'Questions',
      headerName: 'Questions',
      width: 500,
    },
    { field: 'difficulty', headerName: 'Difficulty', width: 90 },
    { field: 'questionType', headerName: 'Question Type', width: 150 }
  ];

  return (
    <div>
      <div>
        <div style={{ marginBottom: '-35px', position: 'fixed' }}>
          <CusButtonPurp
            onClick={handleQuiz}
            disabled={selectedRows.length === 0}
            sx={{ backgroundColor: '#6070D4', width: '120px', fontWeight: '40px', marginLeft: '1100px' }}
          >
            <Typography fontSize={16} sx={{ margin: '-2px -6px 0px 0px' }}>Create Quiz</Typography>
            <NavigateNextIcon sx={{ marginRight: '-8px' }} />
          </CusButtonPurp>

          <AddQuiz
            state={openQuiz}
            setOpen={setOpenQuiz}
            selectedRows={selectedRows}
          />
        </div>

        <div style={{ marginBottom: '-35px', marginTop: '60px', position: 'fixed' }}>
          <CusButtonPurp
            disabled={selectedRows.length === 0}
            sx={{ backgroundColor: '#6070D4', width: '120px', fontWeight: '40px', marginLeft: '1100px' }}
            onClick={handleDelete}
          >
            <Typography fontSize={16} sx={{ margin: '-2px -6px 0px 0px' }}>Delete</Typography>
            <NavigateNextIcon sx={{ marginRight: '-8px' }} />
          </CusButtonPurp>
          <DeleteBox
            state={open}
            setOpen={setOpen}
            selectedRows={selectedRows}
            handleDeleteConfirm={handleDeleteConfirm}
          />
        </div>

        <div style={{ marginBottom: '-35px', marginTop: '120px', position: 'fixed' }}>
          <CusButtonPurp
            disabled={selectedRows.length === 0 || selectedRows.length > 1}
            sx={{ backgroundColor: '#6070D4', width: '120px', fontWeight: '40px', marginLeft: '1100px' }}
            onClick={() => {
              setOpenUpdateBox(true);
              setNewQuestion(selectedRows[0].questionText);
              setUpdatedAnswers(selectedRows[0].answers.map(answer => answer.answer_text));
            }}
          >
            <Typography fontSize={16} sx={{ margin: '-2px -6px 0px 0px' }}>Update</Typography>
            <NavigateNextIcon sx={{ marginRight: '-8px' }} />
          </CusButtonPurp>
          <UpdateBox
            state={openUpdateBox}
            setOpen={setOpenUpdateBox}
            selectedQuestion={selectedRows.length === 1 ? selectedRows[0] : null}
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
            handleUpdate={handleUpdate}
            handleAnswerChange={handleAnswerChange}
            updatedAnswers={updatedAnswers}
            setUpdatedAnswers={setUpdatedAnswers} // Pass setUpdatedAnswers
          />
        </div>
      </div>

      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid 
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 100]}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)}
          onRowClick={(params) => handleQuestionClick(params.id)}
        />
      </div>

      <Answerbox
        open={questionBox.open}
        questionDetails={questionBox.data}
        onClose={handleCloseQuestionBox}
      />
    </div>
  );
};

export default DataTable;
