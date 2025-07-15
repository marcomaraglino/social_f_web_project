import React, {useContext, useState} from 'react';
import {X, Trash, PenLine} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthContext} from "@/utils/AuthProvider.jsx";
import {UpdateEvent} from "../UpdateEvent/UpdateEvent.jsx"

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('joined');
    const { user, fetchWithAuth, setUser } = useContext(AuthContext);
    const [modalShow, setModalShow] = useState(false);
    const [eventId, setEventId] = useState(null);

    const createdEvents = user?.createdEvents ?? [];
    const joinedEvents = user?.joinedEvents ?? [];

    const handleRemoveEvent = (eventId) => {
        // Logic to remove event from user's created events
        fetchWithAuth(import.meta.env.VITE_API_BASE_URL +`/events/${eventId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // Update state or refetch events
                    console.log('Event removed successfully');
                    setUser(prevUser => ({
                        ...prevUser,
                        createdEvents: prevUser.createdEvents.filter(event => event._id !== eventId),
                        joinedEvents: prevUser.joinedEvents.filter(event => event._id !== eventId)
                    }));
                } else {
                    console.error('Failed to remove event');
                }
            })
            .catch(error => console.error('Error removing event:', error));
    }

    return (
        <div className="container my-4">
            <div className="bg-white shadow rounded p-4 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <div className="px-1 justify-content-center d-flex flex-column">
                        <h1 className="fs-4 text-primary text-start fw-bold mb-0">{user.username}</h1>
                        <p className="m-0 text-secondary">{user.email}</p>
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
                        Events Joined ({joinedEvents.length})
                    </button>
                    <button
                        className={`btn ${activeTab === 'created' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => setActiveTab('created')}
                    >
                        Events Created ({createdEvents.length})
                    </button>
                </div>

                <div className="list-group">
                    {(activeTab === 'joined' ? joinedEvents : createdEvents).map((event, index) => (
                        <div
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="w-100 d-flex flex-row justify-content-between align-items-center gap-3">
                                <div className="d-flex flex-column gap-2">
                                    <h3 className="h6 text-start mb-1">{event.title}</h3>
                                    <p className="text-start small text-secondary mb-0">
                                        {event.description}
                                    </p>
                                    <p className="text-start small text-secondary mb-0">
                                        {/*    // Data in formato leggibile italiano*/}
                                        📅 {new Date(event.date).toLocaleDateString('it-IT', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                    <p className="text-start small text-secondary mb-0">
                                        📍 {event.location}
                                    </p>
                                </div>
                                <div className='d-flex gap-2'>
                                    {activeTab === 'created' && (
                                        <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={()=>{
                                            setModalShow(true)
                                            setEventId(event._id)
                                        }}>
                                            <PenLine />
                                        </button>
                                    )}
                                <button onClick={() => handleRemoveEvent(event._id)} className="btn btn-sm btn-outline-danger rounded-pill">
                                    {activeTab === 'created' ? <Trash/> : <X/>}
                                </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {(activeTab === 'created' && createdEvents.length === 0) && (
                        <p className="text-muted small">No events created yet.</p>
                    )}
                </div>
            </div>
            <UpdateEvent
                show={modalShow}
                eventId={eventId}

                onHide={() => setModalShow(false)}/>
        </div>
    );
};

export default UserProfile;