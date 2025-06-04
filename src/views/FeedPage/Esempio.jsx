import React, { useState } from 'react';
import { EventCard } from '../components/EventCard';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for events
const mockEvents = [
    {
        id: 1,
        title: "5-a-side Football Match",
        description: "Friendly football game at the local park",
        date: "2024-06-01",
        time: "18:00",
        location: "Central Park, NYC",
        maxParticipants: 10,
        currentParticipants: 7,
        category: "Sports",
        isOnline: false,
        createdBy: "Alex Chen"
    },
    {
        id: 2,
        title: "Online Gaming Night - Valorant",
        description: "Competitive matches and fun games",
        date: "2024-06-02",
        time: "20:00",
        location: "Online",
        maxParticipants: 5,
        currentParticipants: 3,
        category: "Gaming",
        isOnline: true,
        createdBy: "Sarah Kim"
    },
    {
        id: 3,
        title: "Coffee & Code Meetup",
        description: "Casual meetup for developers to share ideas",
        date: "2024-06-03",
        time: "14:00",
        location: "Starbucks Downtown",
        maxParticipants: 15,
        currentParticipants: 8,
        category: "Tech",
        isOnline: false,
        createdBy: "Mike Johnson"
    },
    {
        id: 4,
        title: "Board Game Night",
        description: "Bring your favorite games or try new ones!",
        date: "2024-06-04",
        time: "19:00",
        location: "Community Center",
        maxParticipants: 12,
        currentParticipants: 5,
        category: "Social",
        isOnline: false,
        createdBy: "Emma Davis"
    }
];

const Events = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", "Sports", "Gaming", "Tech", "Social"];

    const filteredEvents = selectedCategory === "All"
        ? mockEvents
        : mockEvents.filter(event => event.category === selectedCategory);

    return (
        <div className="container-fluid px-4 py-4" style={{ maxWidth: '1024px' }}>
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h1 className="h2 fw-bold text-dark mb-1">Discover Events</h1>
                    <p className="text-muted">Find amazing activities near you</p>
                </div>
                <Link to="/create-event" className="text-decoration-none">
                    <button className="btn btn-gradient rounded-pill px-4 py-2 shadow-custom">
                        <Plus size={16} className="me-2" />
                        Create Event
                    </button>
                </Link>
            </div>

            {/* Category Filter */}
            <div className="d-flex gap-2 overflow-auto pb-2 mb-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`btn rounded-pill px-4 py-2 text-nowrap ${
                            selectedCategory === category
                                ? "btn-gradient"
                                : "btn-outline-secondary"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Events Grid */}
            <div className="row g-4">
                {filteredEvents.map((event) => (
                    <div key={event.id} className="col-12 col-md-6">
                        <EventCard event={event} />
                    </div>
                ))}
            </div>

            {filteredEvents.length === 0 && (
                <div className="text-center py-5">
                    <p className="text-muted h5">No events found in this category</p>
                </div>
            )}
        </div>
    );
};

export default Events;