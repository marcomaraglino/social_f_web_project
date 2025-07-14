import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import './ViewPartecipants.css'
import {Calendar, Globe, MapPin, Users} from "lucide-react";
import React from "react";


export function ViewPartecipants(props) {
    const isOnline = (online) => online === true;
    const getActivityClass = (activity) => {
        switch (activity) {
            case 'Sport':
                return 'Activity-sport';
            case 'Tech':
                return 'Activity-tech';
            case 'Gaming':
                return 'Activity-gaming';
            default:
                return 'Activity-social';
        }
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            className='custom-modal'
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div>

            </div>
            <div className="d-flex justify-content-between p-3">
                    <span className={`badge rounded-pill px-3 py-2 ${getActivityClass(props.activity)}`}>
                        {props.activity}
                    </span>

                <span className={`d-flex align-items-center gap-1 ${isOnline(props.online)
                    ? 'text-info fs-6'
                    : 'text-white'
                }`}>
                        <Globe size={15} className={`${isOnline(props.online)
                            ? 'text-info'
                            : 'text-white'
                        }`} />
                        Online
                    </span>
            </div>
            <Modal.Title className='p-3 fw-bold'>Partecipanti</Modal.Title>
            <Modal.Body>
                <ul>
                    {props.partecipanti.map((p)=>(
                        <li key={p.id}>{p.nomePartecipante}</li>
                    ))}
                </ul>
            </Modal.Body>
            <div className='d-flex justify-content-center gap-3 mt-3'>
                <Button className='btn btn-gradient w-100 py-3 button-modal fw-bold' onClick={props.onHide}>Chiudi</Button>
            </div>
        </Modal>
    );

}