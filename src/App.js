import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import { Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import BoardPage from './pages/BoardPage'
import ProjectPage from './pages/ProjectPage'
import BoardsListPage from './pages//BoardsListPage'
import Header from './components/Header'

function App() {

  return (
    <div className="App">
      <Router>
      
      <div>
        <AuthProvider>
          <Header/>

          <Route component={HomePage} path="/" />
          <Route component={LoginPage} path="/login"/>
          <Route component={RegisterPage} path="/register"/>
          {/* <Route component={Board} path="/"/> */}
                          
          {/* <Route path="/" exact component={BoardsListPage} /> */}
          <Route path="project/:id" component={ProjectPage} />
          <Route path="project/:id/board/:id" component={BoardPage} />
          
        </AuthProvider>
      </div>

      </Router>
    </div>
  );
}

export default App;