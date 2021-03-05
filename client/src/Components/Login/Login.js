import React, {useState, useEffect} from 'react'
import style from './Login.module.scss';
import backgroundImage from '../../Content/Images/background-logon.jpg';
import Dashboard from '../Dashboard/Dashboard';
import input from '../Utilities/Input.module.scss';
import logo from '../../Content/Images/logo.png';
import {
    Switch,
    Route,
    useHistory 
  } from "react-router-dom";

 const Login = () => {
    const [username, setUsername] = useState();
    const [user, setUsers] = useState(false);
    const [fetchUsers, setFetching] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    let history = useHistory();

    useEffect(() => {
        setUsername(username);
    },[username]);

    useEffect(() => {
        if (fetchUsers) {
            const url = `${process.env.REACT_APP_API_URL}/users/${username}`;
            fetch(url)
            .then((response) => response.json())
            .then((res => {
                console.log(res.data);
                setFetching(false);
                if (res.data) {
                    setError(false);
                    setUsers(res.data);
                    setFetched(true);
                    history.push("/dashboard");
                } else {
                    setFetched(false);
                    setError(true);
                    setErrorMessage("User not found");
                }
            }))
        }
    });

    const handleUsername = (e) => {
        let parseValue = e.target.value.replace(/\s+/g, '');
        if (parseValue === ""){
            setUsername(false);
        } else {
            setUsername(parseValue);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFetching(true);
    }

    if (fetched) {
        return (
        <Switch>
            <Route absolute path="/dashboard">
                <Dashboard user={user} />
            </Route>
        </Switch>
        )
    } else {
    return (
        <>
        <div className={style.Container}>
            <div className={style.Login}>
                <div className={style.Background}>
                    <img src={backgroundImage} alt="Background" />
                </div>
                <div className={style.Details}>
                    <img src={logo} alt="Hyperpro logo" width="150px"/>
                    <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input className={input.Text} onChange={handleUsername} type="text" />
                    <button className={input.Button}>Login</button>
                    </form>
                    {fetched ? `${user.data.username}` : null}
                    {error ? `${errorMessage}` : null}
                </div>
            </div>
        </div>
        </>
        )
    }
}
export default Login;