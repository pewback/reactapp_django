import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

import ProjectPage from './ProjectPage';


const ProjectsListPage = () => {
    const [projects, setProjects] = useState([])
    const {authTokens, logoutUser} = useContext(AuthContext)
    const [projectId, setProjectID] = useState([])
    const [showProjectPage,setShowProjectPage] =useState(false)
    useEffect(()=> {
        getProjects()
        setProjectID()
    }, [])
    const getProjects = async() =>{
        await axios.get(`http://127.0.0.1:8000/projects/`, {
            method:'GET',
            headers:{
                
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        }).then((response)=>{
          const data = response.data
          setProjects(data)
        //   console.log(data)
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
                Your projects:
                <ul>
                {projects.map(project => (
                        <li><Link to={`/project/${project.id}`}><button  key={project.id} onClick={()=>setShowProjectPage(true)}>{project.title}</button></Link></li>   
                        // <li><button  key={project.id} >{project.title}</button></li>
                        
                    ))}
                </ul>
                {showProjectPage? (
                <div>
                    <ProjectPage/>
                </div>            
                ): (
                    <p></p>
                )}
                    
            </div>
                
                ): (
                    <p></p>
                )}
             
            
        </div>

  )
}

export default ProjectsListPage