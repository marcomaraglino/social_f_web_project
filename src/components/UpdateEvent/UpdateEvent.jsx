import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import './UpdateEvent.css';
import Form from 'react-bootstrap/Form';

export function UpdateEvent(props) {

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
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Event Title</Form.Label>
                        <Form.Control
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
                        <Form.Select>
                            <option>Select Category</option>
                            <option value={1}>Sports</option>
                            <option value={2}>Gaming</option>
                            <option value={1}>Tech</option>
                            <option value={1}>Social</option>
                        </Form.Select>
                    </Form.Group>
                    <div className='d-flex '>
                        <Form.Group className="mb-3 me-2 w-50" controlId="formBasicDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group className="mb-3 w-50" controlId="formBasicTime">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time" />
                        </Form.Group>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter the location of the event" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicMaxParticipants">
                        <Form.Label>Max Participants</Form.Label>
                        <Form.Control type="text" placeholder="Enter the max number of the partecipants" />
                    </Form.Group>
                </Form>

                <Button className='bottone fw-bold w-100 py-3'  onClick={props.onHide}>
                    Save Changes
                </Button>
            </Modal>
    )
}