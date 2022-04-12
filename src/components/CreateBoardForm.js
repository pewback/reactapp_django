import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

const CreateBoardForm = (idOfProject) => {

    let {authTokens} = useContext(AuthContext)
    let [showCreateBoardForm,setshowCreateBoardForm] =useState(false)
    const [formValues, setFormValues] = useState({
        title: "",
        color:"blue",
        project:`${idOfProject.idOfProject}`

      });
      const handleInputChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setFormValues({...formValues,[name]: value});
      };
      const submitForm = event => {
        setshowCreateBoardForm(false)
        
        event.preventDefault();
        
        createBoard()
      };
      const createBoard = async() =>{
        await axios.post('http://127.0.0.1:8000/boards/',formValues, {
            method:'POST',
            headers:{
                
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })}
    return (
        
      <div>
          <button onClick={()=>setshowCreateBoardForm(true)}> create board</button>
             {showCreateBoardForm? (
            <div>
                <form onSubmit={submitForm}>
                <input
                    type="text"
                    placeholder="title"
                    value={formValues.username}
                    name="title"
                    onChange={handleInputChange}
                />
                <input type="submit" value="submit" />
                </form>               
            </div>            
            ): (
                <p></p>
             )}
        
      </div>
  )
}

export default CreateBoardForm