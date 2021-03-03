import React from 'react'

const Dashboard = (props) => {

    const user = props.user;
    console.log(user);
    return(
        <>
            {user._id}
            {user.username}
        </>
    )
}

export default Dashboard;