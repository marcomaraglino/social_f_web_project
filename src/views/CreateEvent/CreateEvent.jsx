import {Link} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import "./CreateEvent.css"

function CreateEvent () {
    const categories = ['Sports', 'Gaming', 'Tech', 'Social', 'Food', 'Music'];

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
            <div className="card shadow rounded-2">
                <div className="card-header text-dark mb-0">
                <h5 className="card-title text-dark mb-0">Event details</h5>
                </div>
                <div className="card-body">
                    <form>
                        <div className="mb-4 d-flex flex-column">
                            <label className="form-label fw-medium text-dark" htmlFor="title">Event title *</label>
                            <input
                                className="form-control rounded-3"
                                required
                                type="text"
                                id="title"
                                placeholder="What's your event about?"/>
                        </div>

                        <div className="mb-4 d-flex flex-column">
                            <label className="form-label fw-medium text-dark" htmlFor="description">Description *</label>
                            <textarea
                                className="form-control rounded-3"
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
                    </form>
                </div>

            </div>
            </div>
    )
}
export default CreateEvent;