import React from 'react';
import style from './Dashboard.module.scss';
import { Helmet } from 'react-helmet';

const Dashboard = (props) => {

    const user = props.user;
    console.log(user);
    return(
        <>
        <Helmet>
            <title>Hyperpro - Dashboard</title>
        </Helmet>
            <div className={style.User}>
                <p>User ID: {user._id}</p>
                <p>Username: {user.username}</p>
            </div>
        </>
    )
}

export default Dashboard;