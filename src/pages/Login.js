import React, { useState, useContext } from 'react';
import { AuthContext } from '../components/Context';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const localIp = 'http://127.0.0.1:8000';
    //const localIp = "https://fb-chat-backend.herokuapp.com";
    const defaultUser = { username: '', password: '' };
    const [auth, setAuth, getCookie] = useContext(AuthContext);
    const [user, setUser] = useState(defaultUser);
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        fetch(localIp + '/login', {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.message == "User logged in") {
                    console.log("kc")
                    setAuth({
                        authenticated: true,
                        userId: getCookie('userId'),
                        username: getCookie('username')
                    });
                    console.log("kd")
                    return navigate('/chat');
                }
                            
                setUser(defaultUser);
            });

        e.preventDefault();
    };
    
    return (
        <center>
            <div className="col-12 col-sm-9 col-md-6 col-xl-3">
                <center><h1>Login</h1></center>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="input-field">
                                <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleUserChange}></input>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="input-field">
                                <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleUserChange}></input>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <input className="common-button" type="submit" value="Accept"></input>
                        </div>
                    </div>
                </form>

                <hr></hr>
                <div className="common-text">
                    <center>
                        Don't have an account?&nbsp;&nbsp;<Link to="/register">Sign up here</Link>
                    </center>
                </div>
            </div>
        </center>
    )
}

export default Login