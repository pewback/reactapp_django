
import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { filterByProjectIdBoards } from "../static/constructs";

const HomePage = () => {
    const [boards, setBoards] = useState([])
    const [projects, setProjects] = useState([])
    const { authTokens, logoutUser } = useContext(AuthContext)
    const [projectId, setProjectId] = useState([])
    const [projectTitle, setProjectTitle] = useState([])
    const [showProjectPage, setShowProjectPage] = useState(false)
    const [boardDetail, setBoardDetail] = useState(false);
    const [boardDetailLists, setBoardDetailLists] = useState([])
    const [showBoardPage, setShowBoardPage] = useState(false)
    const [byProjectIdBoards] = filterByProjectIdBoards(boards, projectId);
    const [lists, setLists] = useState([])
    const history = useHistory();
    useEffect(() => {
        getProjects();
        getBoards();
       



    }, [])
    const getProjects = async () => {
        await axios.get('http://127.0.0.1:8000/projects/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        }).then((response) => {
            const data = response.data
            setProjects([...data])
            //console.log(data)

        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }
    const getProject = async (projid) => {
        await axios.get(`http://127.0.0.1:8000/projects/${projid}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        }).then((response) => {
            const data = response.data
            // console.log(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }
    const deleteProject = async (projid) => {
        await axios.delete(`http://127.0.0.1:8000/projects/${projid}/`, {
            method: 'DELETE',
            headers: {

                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        }).then((response) => {
            const data = response.data
            setProjects([...data]);
            getProjects()
            setShowProjectPage(false)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }
    const CreateProjectForm = () => {
        const history = useHistory();
        const { authTokens } = useContext(AuthContext)
        const [showCreateProjectForm, setshowCreateProjectForm] = useState(false)
        const [formValues, setFormValues] = useState({
            title: ""
        });

        const handleInputChange = event => {
            const target = event.target;
            const value = target.type === "checkbox" ? target.checked : target.value;
            const name = target.name;
            setFormValues({
                ...formValues,
                [name]: value
            });
        };
        const submitForm = event => {
            setshowCreateProjectForm(false)
            event.preventDefault();
            createProject();
        };

        const createProject = async () => {
            await axios.post('http://127.0.0.1:8000/projects/', formValues, {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            }).then(() => {
                getProjects();
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
                <button onClick={() => setshowCreateProjectForm(true)}> create project</button>
                {showCreateProjectForm ? (
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
                ) : (
                    <p></p>
                )}

            </div>
        )
    }
    const getBoards = async () => {
        await axios.get('http://127.0.0.1:8000/boards/', {
            method: 'GET',
            headers: {

                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        }).then((response) => {
            const data = response.data
            setBoards(data)
            //   console.log(boards)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })

    }
    const CreateBoardForm = (idOfProject) => {

        const { authTokens } = useContext(AuthContext)
        const [showCreateBoardForm, setshowCreateBoardForm] = useState(false)
        const [formValues, setFormValues] = useState({
            title: "",
            color: "blue",
            project: `${idOfProject.idOfProject}`

        });
        const handleInputChange = event => {
            const target = event.target;
            const value = target.type === "checkbox" ? target.checked : target.value;
            const name = target.name;
            setFormValues({ ...formValues, [name]: value });
        };
        const submitForm = event => {
            setshowCreateBoardForm(false)
            history.push(`/`);
            event.preventDefault();

            createBoard()
        };
        const createBoard = async () => {
            await axios.post('http://127.0.0.1:8000/boards/', formValues, {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            }).then(() => {
                getBoards();
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
                <button onClick={() => setshowCreateBoardForm(true)}> create board</button>
                {showCreateBoardForm ? (
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
                ) : (
                    <p></p>
                )}

            </div>
        )
    }
    const deleteBoard = async (boardid) => {
        await axios.delete(`http://127.0.0.1:8000/boards/${boardid}/`, {
            method: 'DELETE',
            headers: {

                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        }).then(() => {
            getBoards()

        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }
    const getBoardDetail = async(boardid) => {
        
        await axios.get(`http://127.0.0.1:8000/boards/${boardid}/`, {
            method: 'GET',
            headers: {

                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        }).then((response) => {
            const data = response.data;
            
            // console.log( data)
            setBoardDetail(data)
            

        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })

    }

    const onProjectClick = (projid, projtitle) => {
        filterByProjectIdBoards(boards, projid);
        setShowProjectPage(true);
        setProjectId(projid);
        setProjectTitle(projtitle);
        history.push(`/project/${projid}`);
    };
    const onBoardClick = (boardid) => {
        setShowBoardPage(true)
        getBoardDetail(boardid);
        // console.log(boardDetail)
        // console.log(boardDetail.lists)
        // setBoardDetailLists(boardDetail.lists)
        // console.log(boardDetailLists)
        // history.push(`/project/${projectId}`);
    };
    
    return (
        <div>
            {authTokens ? (
                <div>
                    Your projects:
                    <CreateProjectForm />
                    {projects.map(project => (
                        <div key={project.id} >
                            <button onClick={() => { onProjectClick(project.id, project.title) }}>{project.title}</button>
                            <Link to={`/`}><button onClick={() => { deleteProject(project.id) }}>delete</button></Link>
                        </div>
                    ))}
                    {showProjectPage ? (
                        <div>

                            <div>Project {projectTitle} boards:</div>
                            <CreateBoardForm idOfProject={projectId} />
                            {byProjectIdBoards.map((board) => (
                                <div key={board.id}>
                                    <Link to={`/project/${projectId}/board/${board.id}`}><button onClick={() => onBoardClick(board.id)} >{board.title}</button></Link>
                                    <Link to={`/project/${projectId}`}><button onClick={() => { deleteBoard(board.id) }}>delete </button></Link>
                                </div>
                            ))}
                        {showBoardPage  ? (
                        <div>

                        <div>Board {boardDetail.title} lists:</div>
                        {boardDetail ? (
                            (boardDetail.lists).map((list) => (
                                <div key={list.id}>
                                    <a>{list.title}</a>
                                </div>
                        ))) : (<div></div>)}

                                </div> //showBoardPage true           
                            ) : (
                                <div>

                                </div>//showBoardPage false  
                            )}
                        </div> //showProjectPage true           
                    ) : (
                        <div>

                        </div>//showProjectPage false  
                    )}

                </div> //authTokens true
            ) : (
                <div>

                </div>// authTokensfalse
            )}
        </div>

    )
}

export default HomePage