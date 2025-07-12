import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = ({
                         name,
                         surname,
                         email,
                         subscriptionDate,
                         joinedEvents,
                         createdEvents,
                         interests: initialInterests
                     }) => {
    const [activeTab, setActiveTab] = useState('joined');
    const [interests, setInterests] = useState(initialInterests || []);
    const [newInterest, setNewInterest] = useState('');

    const handleAddInterest = () => {
        if (newInterest.trim() !== '' && !interests.includes(newInterest.trim())) {
            setInterests([...interests, newInterest.trim()]);
            setNewInterest('');
        }
    };

    const renderEventStatus = (status) => {
        const styles = {
            upcoming: 'primary',
            completed: 'secondary',
        };
        return <span className={`badge bg-${styles[status]}`}>{status}</span>;
    };

    return (
        <div className="container my-4">
            <div className="bg-white shadow rounded p-4 d-flex justify-content-between align-items-start">
                <div className="d-flex">
                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-4"
                        style={{
                            width: '64px',
                            height: '64px',
                            background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                        }}
                    >
                        {name[0]}{surname[0]}
                    </div>
                    <div className="ms-0 d-flex flex-column justify-content-start">
                        <h1 className="fs-4 fw-bold mb-0">{name} {surname}</h1>
                        <p className="text-secondary mb-1">{email}</p>
                        <p className="text-muted small mb-2">
                            Joined {subscriptionDate} • {joinedEvents.length} events joined • {createdEvents.length} events created
                        </p>

                        {/* Interests badges */}
                        <div className="d-flex gap-2 flex-wrap small mb-2">
                            {interests.map((interest, i) => (
                                <span key={i} className="badge bg-light text-dark">{interest}</span>
                            ))}
                        </div>

                        {/* Add new interest input */}
                        <div className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Add interest"
                                value={newInterest}
                                onChange={(e) => setNewInterest(e.target.value)}
                            />
                            <button className="btn btn-sm btn-outline-primary" onClick={handleAddInterest}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary">
                    Edit Profile
                </button>
            </div>

            {/* Events Tabs */}
            <div className="bg-white shadow rounded p-4 mt-4">
                <h2 className="fs-5 fw-semibold mb-3">My Events</h2>
                <div className="d-flex gap-2 mb-3">
                    <button
                        className={`btn ${activeTab === 'joined' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => setActiveTab('joined')}
                    >
                        Events Joined ({joinedEvents.length})
                    </button>
                    <button
                        className={`btn ${activeTab === 'created' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => setActiveTab('created')}
                    >
                        Events Created ({createdEvents.length})
                    </button>
                </div>

                {/* Events List */}
                <div className="list-group">
                    {(activeTab === 'joined' ? joinedEvents : createdEvents).map((event, index) => (
                        <div
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{ cursor: 'pointer' }}
                        >
                            <div>
                                <h3 className="h6 mb-1">{event.title}</h3>
                                <p className="small text-secondary mb-0">
                                    📅 {event.date} • 📍 {event.location}
                                </p>
                            </div>
                            {renderEventStatus(event.status)}
                        </div>
                    ))}

                    {(activeTab === 'created' && createdEvents.length === 0) && (
                        <p className="text-muted small">No events created yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;