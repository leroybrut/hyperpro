import React, {useState, useEffect} from 'react'
import style from './Login.module.scss';
import backgroundImage from '../../Content/Images/background-logon.jpg';
import Dashboard from '../Dashboard/Dashboard';
import input from '../Utilities/Input.module.scss';

 const Login = () => {
    const [username, setUsername] = useState();
    const [user, setUsers] = useState(false);
    const [fetchUsers, setFetching] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
            <Dashboard user={user} />
        )
    } else {
    return (
        <div className={style.Container}>
            <div className={style.Sidebar}>
                <p>Hyperpro</p>
                <form onSubmit={handleSubmit}>
                <input className={input.Text} placeholder="Name" onChange={handleUsername} type="text" />
                <button className={input.Button}>Login</button>
                </form>
                {fetched ? `${user.data.username}` : null}
                {error ? `${errorMessage}` : null}
            </div>

            <div className={style.Background}>
                <img src={backgroundImage} alt="Background" />
            </div>
        </div>
        )
    }
}
export default Login;