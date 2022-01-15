import React, { useContext } from 'react';
import { AuthContext } from '../components/Context';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();

    const logOut = () => {
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        setAuth({
            authenticated: false,
            userId: -1,
            username: ''
        });

        return navigate('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-background">
                <a className="navbar-brand" href="#">
                    <p>Image</p>
                </a>
                <button className="navbar-toggler ml-auto custom-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link menu-option" href="#">About</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        {auth.userId == -1
                            ?
                            <li className="nav-item">
                                <a className="nav-link menu-option" href="login">Log in</a>
                            </li>
                            :   
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle menu-option" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{auth.username}</a>
                                <div className="dropdown-menu border-0 dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item menu-option" href="#">Perfil</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item menu-option" href="" onClick={logOut}>Log Out</a>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
