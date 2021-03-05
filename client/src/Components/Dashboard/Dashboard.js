import React, {useState, useEffect} from 'react';
import style from './Dashboard.module.scss';
import input from '../Utilities/Input.module.scss';
import { Helmet } from 'react-helmet';


const Dashboard = (props) => {
    const user = props.user;

    const [notifications, setNotifications] = useState(false);
    const [fetchedNotifications, setFetchNotifications] = useState(false);
    const [newNotification, writeNewNotification] = useState(false);

    const addNotification = (e) => {
        const postURL = `${process.env.REACT_APP_API_URL}/notifications/`;
        e.preventDefault();

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

    const handleNotification = (e) => {
        if (e.target.value === ""){
            writeNewNotification(false);
        } else {
            writeNewNotification(e.target.value);
            console.log(e.target.value);
        }
    }

    const handleDeletion = (e, id) => {
        console.log(id);
      
        const url = `${process.env.REACT_APP_API_URL}/notifications/delete/${id}`;
        fetch(url)
        .then((response) => response.json())
        .then((res => {
            console.log(res);
        }));
        // e.preventDefault();
    }

    useEffect(() => {
        if(!fetchedNotifications) {
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
                    {notifications ? (
                        <div className={style.Item}>
                            <div className={style.ItemHeading}>
                                <h3>Notificaties</h3>
                            </div>
                            {fetchedNotifications ? 
                            notifications.map((notification) => {
                                return (
                                <div key={notification._id} className={style.Notification}>
                                    <form onSubmit={handleDeletion(notification._id)}>
                                    <div className={style.NotificationIcon}>
                                    </div>
                                    <div className={style.NotificationMessage}>
                                        <h4>{notification.level}</h4>
                                        <p>{notification.notification}</p>
                                    </div>
                                    <button>Delete</button>
                                    </form>
                                </div>
                                )
                            })
                            : null}
                            <form onSubmit={addNotification}>
                            <input className={input.Text} onChange={handleNotification} type="text" />
                            <button className={input.Button}>Add notification</button>
                            </form>
                        </div>
                     ) : null}
                </div>

            </div>
        </>
    )
}

export default Dashboard;