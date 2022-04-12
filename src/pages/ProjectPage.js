import React from 'react'
import BoardsListPage from './BoardsListPage';
import CreateBoardForm from '../components/CreateBoardForm';
const ProjectPage = () => {
  return (
    <div>                
        <CreateBoardForm/>
        <BoardsListPage/>
    </div>
  )
}

export default ProjectPage