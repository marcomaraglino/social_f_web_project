import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import './ViewPartecipants.css'
import {Calendar, Globe, MapPin, Users} from "lucide-react";
import React, {useContext, useEffect, useState} from "react";
import {EventContext} from "@/utils/EventProvider.jsx";


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
                    <span className={`badge rounded-pill px-3 py-2 ${getActivityClass(props.event.category)}`}>
                        {props.event.category}
                    </span>

                <span className={`d-flex align-items-center gap-1 ${isOnline(props.event.online)
                    ? 'text-info fs-6'
                    : 'text-white'
                }`}>
                        <Globe size={15} className={`${isOnline(props.event.online)
                            ? 'text-info'
                            : 'text-white'
                        }`} />
                        Online
                    </span>
            </div>
            <Modal.Title className='p-3 fw-bold'>Partecipanti</Modal.Title>
            <Modal.Body>
                <div className='d-flex flex-column gap-3'>
                    {Array.isArray(props.event?.subscribe) && props.event.subscribe.length > 0 ? (
                        props.event.subscribe.map((participant, index) => (
                            <div key={index} className='d-flex align-items-center gap-3'>
                                <span className='fw-bold'>{participant.username ?? "Utente sconosciuto"}</span>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-muted'>Nessun partecipante al momento.</p>
                    )}
                </div>
            </Modal.Body>
            <div className='d-flex justify-content-center gap-3 mt-3'>
                <Button className='btn btn-gradient w-100 py-3 button-modal fw-bold' onClick={props.onHide}>Chiudi</Button>
            </div>
        </Modal>
    );

}