import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import './UpdateEvent.css';
import Form from 'react-bootstrap/Form';
import {useContext, useEffect, useState} from "react";
import {EventContext} from "@/utils/EventProvider.jsx";

export function UpdateEvent(props) {

    const categories = ['Sports', 'Gaming', 'Tech', 'Social', 'Food', 'Music'];


    const {updateEvent, getEventById, events, setEvents} = useContext(EventContext);

    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        category: '',
        date: '',
        max: '',
        location: ''
    })

    useEffect(() => {
        if (props.show && props.eventId) {

            const event = getEventById(props.eventId);

            if (event) {
                setEventData({
                    title: event.title || '',
                    description: event.description || '',
                    category: event.category || '',
                    date: event.date ? event.date.slice(0, 16) : '', // per datetime-local
                    max: event.max || '',
                    location: event.location || ''
                });
            }
        }
    }, [props.show, props.eventId]);

    // Function to handle input changes
    const handleInputChange = (field, value) => {
        setEventData( (prev) => ({...prev, [field]: value }));
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSend = {
            ...eventData,
            date: new Date(eventData.date).toISOString() // converte nel formato che serve per la richiesta
        };

        try {
            await updateEvent(props.eventId, dataToSend);
            console.log("submitted");
            console.log(dataToSend);
            window.location.reload();
            props.onHide(); // chiude modal
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    return (
            <Modal
                show={props.show}
                onHide={props.onHide}
                className='custom-modal'
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Title className='fw-bold'>Update Event</Modal.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Event Title</Form.Label>
                        <Form.Control
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            value={eventData.title}
                            type="title"
                            placeholder="Modfy the title of the event"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"

                    >
                        <Form.Label>Event Description</Form.Label>
                        <Form.Control
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            value={eventData.description}
                            as="textarea"
                            placeholder="Modify the description of the event"
                            autoFocus
                            rows={3 }
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Category</Form.Label>
                        <Form.Select onChange={(e) => handleInputChange('category', e.target.value)} value={eventData.category}>
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className='d-flex '>
                        <Form.Group className="mb-3 w-100" controlId="formBasicDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control onChange={(e) => handleInputChange('date', e.target.value)} value={eventData.date} type="datetime-local" />
                        </Form.Group>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" onChange={(e) => handleInputChange('location', e.target.value)} value={eventData.location} placeholder="Enter the location of the event" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicMaxParticipants">
                        <Form.Label>Max Participants</Form.Label>
                        <Form.Control onChange={(e) => handleInputChange('max', e.target.value)} value={eventData.max} type="number" placeholder="Enter the max number of the partecipants" />
                    </Form.Group>
                    <Button type="submit" className='bottone fw-bold w-100 py-3'>
                        Save Changes
                    </Button>
                </Form>
            </Modal>
    )
}