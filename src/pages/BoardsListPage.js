import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const BoardsListPage = () => {
  const [boards, setBoards] = useState([])

  const {authTokens, logoutUser} = useContext(AuthContext)

       useEffect(()=> {
        getBoards()
    }, [])
    const getBoards = async() =>{
        await axios.get('http://127.0.0.1:8000/boards/', {
            method:'GET',
            headers:{
                
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        }).then((response)=>{
          const data = response.data
          setBoards(data)
          // console.log(data)
        //   console.log(boards)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        })   
     
    }
  return (
    <div>            
    {authTokens ? (
    <div>
        
        <div>Your boards:</div>
        <ul>
        {boards.map((board) => (
              <li><Link to={`/board/${board.id}`}><button  key={board.id} >{board.title}</button></Link></li>   
                // <li><Link to='/board/${board.id}'><button  key={board.id} >{board.title}</button></Link></li>
            ))}
        </ul>
    </div>
    ): (
        <p></p>
     )}

</div>
  )
}

export default BoardsListPage



// import React, { useState, useEffect } from 'react'
// import ListItem from '../components/ListItem'
// import AddButton from '../components/AddButton'


// const NotesListPage = () => {

//     let [notes, setNotes] = useState([])

//     useEffect(() => {
//         getNotes()
//     }, [])


//     let getNotes = async () => {

//         let response = await fetch('/api/notes/')
//         let data = await response.json()
//         setNotes(data)
//     }

//     return (
//         <div className="notes">
//             <div className="notes-header">
//                 <h2 className="notes-title">&#9782; Notes</h2>
//                 <p className="notes-count">{notes.length}</p>
//             </div>

//             <div className="notes-list">
//                 {notes.map((note, index) => (
//                     <ListItem key={index} note={note} />
//                 ))}
//             </div>
//             <AddButton />
//         </div>
//     )
// }

// export default NotesListPage