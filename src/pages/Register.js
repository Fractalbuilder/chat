import React, { useState, useContext } from 'react'
import { AuthContext } from '../components/Context';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    //const localIp = 'http://127.0.0.1:8000';
    const localIp = 'https://fb-chat-backend.herokuapp.com';
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
        fetch(localIp + '/register-user', {
            method: 'POST',
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.message == "User added") {
                    document.cookie = `userId=${data.userId}`;
                    document.cookie = `username=${data.username}`;

                    setAuth({
                        authenticated: true,
                        userId: data.userId,
                        username: data.username
                    });

                    return navigate('/chat')
                }
                            
                setUser(defaultUser);
            });

        e.preventDefault();
    };

    return (
        <center>
            <div className="col-12 col-sm-9 col-md-6 col-xl-3">
                <center><h1>Register</h1></center>
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
                        Already have an account?&nbsp;&nbsp;<Link to="/login">Log in here</Link>
                    </center>
                </div>
            </div>
        </center>
    )
}

export default Register
