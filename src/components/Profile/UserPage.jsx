import React from 'react';
import userData from '../../data/user.json';
import UserProfile from './Profile';

const UserPage = () => {
    const {
        name,
        surname,
        email,
        subscriptionDate,
        interests,
        joinedEvents,
        createdEvents
    } = userData;

    return (
        <div className="container">
            <UserProfile
                name={name}
                surname={surname}
                email={email}
                subscriptionDate={subscriptionDate}
                interests={interests}
                joinedEvents={joinedEvents}
                createdEvents={createdEvents}
            />
        </div>
    );
};

export default UserPage;