import {Link, useNavigate} from "react-router-dom";
import {ArrowLeft, Globe} from "lucide-react";
import "./CreateEvent.css"
import {useState} from "react";

function CreateEvent () {
    const categories = ['Sports', 'Gaming', 'Tech', 'Social', 'Food', 'Music'];

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        maxParticipants: '',
        category: '',
        isOnline: false
    });

    const handleInputChange = (field, value) => {
        setFormData( (prev) => ({...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("create event");
        navigate('/')
    }

    return (
        <div style={{maxWidth: '768px'}} className="container p-4 text-start">
        <div className="d-flex align-items-center gap-3 mb-4" style={{maxWidth: '768px'}}>
            <Link to='/'>
                <button style={{width: '40px', height: '40px'}} className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center">
                    <ArrowLeft size={16}/>
                </button>
            </Link>
            <h2 className="h2 fw-bold text-dark mb-0">
                Create new event
            </h2>
        </div>
            <div className="card border-0 shadow rounded-2">
                <div className="card-header py-3 text-dark mb-0">
                    <h5 className="card-title text-dark mb-0">Event details</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 d-flex flex-column">
                            <label className="form-label fw-medium text-dark" htmlFor="title">Event title *</label>
                            <input
                                className="form-control rounded-3"
                                value={formData.title}
                                onChange={ (e) => handleInputChange('title', e.target.value)}
                                required
                                type="text"
                                id="title"
                                placeholder="What's your event about?"/>
                        </div>

                        <div className="mb-4 d-flex flex-column">
                            <label className="form-label fw-medium text-dark" htmlFor="description">Description *</label>
                            <textarea
                                className="form-control rounded-3"
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                value={formData.description}
                                required
                                rows={4}
                                id="description"
                                placeholder="Tell people what to expect..."
                                style={{fontSize: '14px', minHeight: '100px'}}
                            />
                        </div>

                        <div className="mb-4 d-flex flex-column">
                            <label className="form-label fw-medium text-dark">Category *</label>
                            <select
                                className="form-select rounded-3"
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                value={formData.category}
                                required
                                placeholder="Tell people what to expect..."
                                style={{fontSize: '14px'}}
                            >
                                <option value="">Select category</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Date and Time */}
                        <div className="row mb-4">
                            <div className="col-6">
                                <label className="form-label fw-medium text-dark" htmlFor="date">
                                    Date *
                                </label>
                                <input
                                type="date"
                                className="form-control rounded-3"
                                id="date"
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                value={formData.date}
                                min={new Date().toISOString().split('T')[0]}
                                required
                                style={{fontSize: '14px'}}


                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-medium text-dark" htmlFor="time">
                                    Time *
                                </label>
                                <input
                                type="time"
                                className="form-control rounded-3"
                                id="time"
                                onChange={(e) => handleInputChange('time', e.target.value)}
                                value={formData.time}
                                required
                                style={{fontSize: '14px'}}/>
                            </div>
                        </div>

                        <div className="d-flex align-items-center justify-content-between p-3 mb-4 rounded-3" style={{backgroundColor: '#f9fafb'}}>
                            <div className="d-flex align-items-center">
                                <Globe size={20} className="text-info me-3"/>
                                <div>
                                    <div className="fw-medium text-dark small">Online Event</div>
                                    <div className="text-muted" style={{fontSize: '12px'}}>Toggle if this is a virtual event</div>
                                </div>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    onChange={(e) => handleInputChange('isOnline', e.target.checked)}
                                    checked={formData.isOnline}
                                    className="form-check-input"
                                    type="checkbox"
                                    id="isOnline"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="location" className="form-label fw-medium text-dark">
                                {!formData.isOnline ? "Location *" : "Meeting Link *"}
                            </label>
                            <input
                                type="text"
                                className="form-control rounded-3"
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                value={formData.location}
                                id="location"
                                placeholder={!formData.isOnline ? "Where will this happen?" : "Zoom, Discord, Google Meet..."}
                                style={{fontSize: '14px'}}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="maxParticipants" className="form-label fw-medium text-dark">
                                Maximum Participants *
                            </label>
                            <input
                                type="number"
                                onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                                value={formData.maxParticipants}
                                min="2"
                                max="100"
                                className="form-control rounded-3"
                                id="maxParticipants"
                                placeholder="How many people can join?"
                                required
                                style={{fontSize: '14px'}}
                            />
                        </div>

                        <button
                            type="submit"
                        className="btn btn-gradient w-100 py-3 fw-medium rounded-3 shadow-lg">
                            Create Event
                        </button>
                    </form>
                </div>

            </div>
            </div>
    )
}
export default CreateEvent;