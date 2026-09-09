import React from 'react'

import SideBar from "../../Components/Admin/SideBar";
import Container from '../../Components/Admin/AddQuestion.js/box';
import AdminNavBar from '../../Components/Utils/AdminNavBar';

function ViewQuestions() {
  return (
    <div>
      <AdminNavBar />      
<div style={{marginTop: '120px', marginLeft: '-90px'}}>
        <Container/>
</div>
    
    </div>
  )
}

export default ViewQuestions
