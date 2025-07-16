    import './EventCard.css'
    import {Link, Route} from 'react-router-dom';
    import {ViewDetails} from '../../components/ViewDetails/ViewDetails.jsx';
    import {ViewPartecipants} from '../../components/ViewPartecipants/ViewPartecipants.jsx';
    import {Calendar, Users, MapPin, Globe} from 'lucide-react'
    import {AuthContext} from "@/utils/AuthProvider.jsx";
    import {useState} from "react";


    export function EventCard(props){
        const getActivityClass = (activity) => {
            switch (activity){
                case 'Sport': return 'Activity-sport';
                case 'Tech': return 'Activity-tech';
                case 'Gaming': return 'Activity-gaming';
                default: return 'Activity-social';

            }
        }
        const isOnline = (online) => online === true;
        const [modalShow, setModalShow] = useState(false);
        const [showPartecipants, setShowPartecipants] = useState(false);


        return(
                <div className='text-start p-4 d-flex flex-column rounded-3 gap-2 shadow'>
                    <div className="d-flex justify-content-between">
                        <span className={`badge rounded-pill px-3 py-2 ${getActivityClass(props.event.category)}`}>
                            {props.event.category}
                        </span>

                            <span className={`d-flex align-items-center gap-1 ${isOnline(props.event.isOnline)
                                ?'text-info fs-6'
                                :'text-white'
                            }`}>
                                <Globe size={15}  className={`${isOnline(props.event.isOnline)
                                    ?'text-info'
                                    :'text-white'
                                }`}/>
                                Online
                            </span>
                    </div>
                    <h2 className="text-start fw-bold">{props.event.title}</h2>
                    <p>{props.event.description}</p>
                    <div className=''>
                        <div className={'d-flex gap-2'}>
                            <Calendar size={20} color='#7a7a7a' />
                            <p>{new Date(props.event.date).toLocaleDateString('it-IT', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                        </div>
                        <div className={'d-flex gap-2'}>
                            <div className={'d-flex gap-2'}>
                                 {isOnline(props.event.isOnline)
                                ?(<Globe size={20} color='grey'/>)
                                :(<MapPin size={20} color='grey' />)}
                            </div>
                            <p>{props.event.location}</p>
                        </div>
                        <div className={'d-flex gap-2'}>
                            <Users size={20} color='#7a7a7a' />
                            <p>{props.event.subscribe.length}/{props.event.max}</p>
                        </div>
                    </div>
                    <div className='statsPartecipanti'>
                        <div className='fillStats' style={{width: `${(props.event.subscribe.length/props.event.max)*100}%`}}></div>
                    </div>
                        <button className='btn btn-gradient details w-100 py-3' onClick={()=>{setModalShow(true)}}>
                            View Details</button>
                    <ViewDetails
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        onShowPartecipants={() =>{
                            setModalShow(false);
                            setShowPartecipants(true)}}
                        event={props.event}

                    />

                        <ViewPartecipants
                            show={showPartecipants}
                            onHide={() => setShowPartecipants(false)}
                            event={props.event}
                        />
                </div>

        )
    }