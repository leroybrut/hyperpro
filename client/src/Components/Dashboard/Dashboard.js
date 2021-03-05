import React, {useState, useEffect} from 'react';
import style from './Dashboard.module.scss';
import input from '../Utilities/Input.module.scss';
import { Helmet } from 'react-helmet';
import {useHistory} from 'react-router-dom';


const Dashboard = (props) => {
    const user = props.user;
    let history = useHistory();
    
    const [notifications, setNotifications] = useState(false);
    const [fetchedNotifications, setFetchNotifications] = useState(false);
    const [newNotification, writeNewNotification] = useState(false);

    const addNotification = (e) => {
        const postURL = `${process.env.REACT_APP_API_URL}/notifications/`;
        e.preventDefault();

        if (newNotification) {
            let data = {
                "notification" : newNotification,
                "level" : "New"
            }
            fetch(postURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((res => {
                console.log(res.data);
                setFetchNotifications(false);
            }));
        }
    }

    const handleNotification = (e) => {
        if (e.target.value === "") {
            return;
        } else {
            writeNewNotification(e.target.value);
            console.log(e.target.value);
        }
    }

    const handleDeletion = async(id) => {

        let data = {
            "id" : id
        }

        const url = `${process.env.REACT_APP_API_URL}/notifications/delete/${id}`;

        fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((res => {
            console.log(res);
            setFetchNotifications(false);
        }));
    }

    const logOut = () => {
        history.push("/dashboard");
    }

    useEffect(() => {
        if (!fetchedNotifications) {
        const url = `${process.env.REACT_APP_API_URL}/notifications/`;
            fetch(url)
            .then((response) => response.json())
            .then((res => {
                console.log(res.data);
                if (res.data) {
                    setNotifications(res.data);
                    setFetchNotifications(true);
                } 
            }))
        }
    }, [fetchedNotifications]);

    return(
        <>
            <Helmet>
                <title>Hyperpro - Dashboard</title>
            </Helmet>

            <div className={style.Dashboard}>
                <div className={style.User}>
                    <p>User ID: {user._id}</p>
                    <p>Username: {user.username}</p>
                </div>
                <div className={style.Container}>
                    <div className={style.Sidebar}>
                        <div className={style.SidebarSection}>
                            <h3>Menu</h3>

                            <div className={style.SidebarRow}>
                                <div className={style.SidebarIcon}></div>
                                <p>Overview</p>
                            </div>

                            <div onClick={() => logOut()} className={style.SidebarRow}>
                                <div className={style.SidebarIcon}></div>
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>

                    {notifications ? (
                        <div className={style.Item}>
                            <div className={style.ItemHeading}>
                                <h3>Notificaties</h3>
                            </div>

                            {fetchedNotifications ? 
                            notifications.map((notification) => {
                                return (
                                <div key={notification._id} className={style.Notification} >
                                    <div className={style.NotificationIcon}>
                                    </div>
                                    <div className={style.NotificationMessage}>
                                        <h4>{notification.level}</h4>
                                        <p>{notification.notification}</p>
                                    </div>
                                    <div className={style.NotificationDelete} onClick={() => handleDeletion(notification._id)}>X</div> 
                                </div>
                                )
                            })
                            : 'Loading...'}

                            <form onSubmit={addNotification}>
                                <input className={input.Text} onChange={handleNotification} type="text" />
                                <button className={input.Button}>Add notification</button>
                            </form>

                        </div>
                    ) : null}

                    <div className={style.Item}>
                        <div className={style.ItemHeading}>
                            <h3>Producten</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;