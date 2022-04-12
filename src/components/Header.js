import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)

    return (
        <div>
            <Link to="/" ><button>Home</button></Link>
            <span> | </span>
            {user ? (
                 <button  onClick={logoutUser}>Logout</button>
            ): (
            <Link to="/login" ><button>Login</button></Link>
            )}
           <span> | </span>
            {user ? (
                 <p>Hello {user.username} your id is: {user.user_id}</p>
            ): (
            <Link to="/register" ><button>Register</button></Link>

            )}
        </div>
    )
}

export default Header