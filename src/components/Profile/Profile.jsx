import React, {useContext, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthContext} from "@/utils/AuthProvider.jsx";

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('joined');
    const [profileData, setProfileData] = useState({});
    const { fetchWithAuth } = useContext(AuthContext);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetchWithAuth(import.meta.env.VITE_API_BASE_URL + '/profile/');
                if (!response.ok) throw new Error("Failed to fetch profile data");
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, [fetchWithAuth]);

    return (
        <div className="container my-4">
            <div className="bg-white shadow rounded p-4 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <div className="px-5 justify-content-center d-flex flex-column">
                        <h1 className="fs-4 text-primary text-start fw-bold mb-0">{profileData.username}</h1>
                        <p className="m-0 text-secondary">{profileData.email}</p>
                        {/*<p className="text-muted small mb-2">
                            *Joined {subscriptionDate} • {joinedEvents.length} events joined • {createdEvents.length} events created
                        </p>*/}

                        {/* Interests badges
                        <div className="d-flex gap-2 flex-wrap small mb-2">
                            {interests.map((interest, i) => (
                                <span key={i} className="badge bg-light text-dark">{interest}</span>
                            ))}
                        </div>
                        */}

                        {/* Add new interest input
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
                        */}
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
                        {/*Events Joined ({joinedEvents.length})*/}
                    </button>
                    <button
                        className={`btn ${activeTab === 'created' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => setActiveTab('created')}
                    >
                        {/*Events Created ({createdEvents.length})*/}
                    </button>
                </div>

                {/* Events List
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

                    {/*{(activeTab === 'created' && createdEvents.length === 0) && (
                        <p className="text-muted small">No events created yet.</p>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default UserProfile;