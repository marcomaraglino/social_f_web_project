import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ViewDetails.css'
import {Calendar, Globe, MapPin, Users} from "lucide-react";

export function ViewDetails(props) {
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
                centered>
                <div className="d-flex justify-content-between p-3">
                    <span className={`badge rounded-pill px-3 py-2 ${getActivityClass(props.category)}`}>
                        {props.category}
                    </span>

                    <span className={`d-flex align-items-center gap-1 ${isOnline(props.online)
                        ? 'text-info fs-6'
                        : 'text-white'
                    }`}>
                            <Globe size={15} className={`${isOnline(props.online)
                                ? 'text-info'
                                : 'text-white'
                            }`}/>
                            Online
                        </span>
                </div>
                <Modal.Title className=' p-3  fw-bold'>
                    {props.title}
                </Modal.Title>
                <Modal.Body>

                    <p>{props.description}</p>
                    <div className='otherInfo'>
                        <div className={'d-flex gap-2'}>
                            <Calendar size={20} color='#7a7a7a'/>
                            <p>{new Date(props.date).toLocaleDateString('it-IT', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                        </div>
                        <div className={'d-flex gap-2'}>
                            <div className={'d-flex gap-2'}>
                                {isOnline(props.online)
                                    ? (<Globe size={20} color='grey'/>)
                                    : (<MapPin size={20} color='grey'/>)}
                            </div>
                            <p>{props.location}</p>
                        </div>
                        <div className={'d-flex gap-2'}>
                            <Users size={20} color='#7a7a7a'/>
                            <p>{props.subscribe.length}/{props.max}</p>
                        </div>
                    </div>
                    <div className='statsPartecipanti'>
                        <div className='fillStats' style={{width: `${(props.subscribe.length/props.max)*100}%`}}></div>
                    </div>
                    <div className='d-flex justify-content-center gap-3 mt-3'>
                        <Button className='btn btn-gradient w-50 py-3 button-modal fw-bold ' onClick={props.onShowPartecipants}>
                            Vedi Partecipanti
                        </Button>
                        <Button className='btn btn-gradient w-50 py-3 button-modal fw-bold' onClick={() => {
                            handleJoin();
                            props.onHide();
                        }}>
                            Join Event
                        </Button>
                    </div>

                </Modal.Body>



            </Modal>

    )

}