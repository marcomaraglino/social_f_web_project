import './EventCard.css'
import {Link, Route} from 'react-router-dom';
import React from 'react';
import {ViewDetails} from '../../components/ViewDetails/ViewDetails.jsx';
import {ViewPartecipants} from '../../components/ViewPartecipants/ViewPartecipants.jsx';
import {Calendar, Users, MapPin, Globe} from 'lucide-react'
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
    const [modalShow, setModalShow] = React.useState(false);
    const [showPartecipants, setShowPartecipants] = React.useState(false);
    const partecipanti = [
        {
            id: 1,
            nomePartecipante: 'Claudio',
        },
        {
            id: 2,
            nomePartecipante: 'Giacomo'
        },
        {
            id: 3,
            nomePartecipante: 'Marco'
        },
        {
            id: 4,
            nomePartecipante: 'Michael'
        }
    ]
    return(
            <div className='text-start p-4 d-flex flex-column rounded-3 gap-2 shadow'>
                <div className="d-flex justify-content-between">
                    <span className={`badge rounded-pill px-3 py-2 ${getActivityClass(props.activity)}`}>
                        {props.activity}
                    </span>

                        <span className={`d-flex align-items-center gap-1 ${isOnline(props.online)
                            ?'text-info fs-6'
                            :'text-white'
                        }`}>
                            <Globe size={15}  className={`${isOnline(props.online)
                                ?'text-info'
                                :'text-white'
                            }`}/>
                            Online
                        </span>
                </div>
                <h2 className="text-start fw-bold">{props.nome}</h2>
                <p>{props.descrizione}</p>
                <div className=''>
                    <div className={'d-flex gap-2'}>
                        <Calendar size={20} color='#7a7a7a' />
                        <p>{props.data}</p>
                    </div>
                    <div className={'d-flex gap-2'}>
                        <div className={'d-flex gap-2'}>
                             {isOnline(props.online)
                            ?(<Globe size={20} color='grey'/>)
                            :(<MapPin size={20} color='grey' />)}
                        </div>
                        <p>{props.luogo}</p>
                    </div>
                    <div className={'d-flex gap-2'}>
                        <Users size={20} color='#7a7a7a' />
                        <p>{props.partecipanti}</p>
                    </div>
                </div>
                <div className='statsPartecipanti'>
                    <div className='fillStats'></div>
                </div>
                    <button className='btn btn-gradient details w-100 py-3' onClick={()=>setModalShow(true)}>
                        View Details</button>
                <ViewDetails
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onShowPartecipants={() =>{
                        setModalShow(false);
                        setShowPartecipants(true)}}
                    nome={props.nome}
                    activity={props.activity}
                    key={props.id}
                    descrizione={props.descrizione}
                    data={props.data}
                    luogo={props.luogo}
                    partecipanti={props.partecipanti}
                    online={props.online}

                />

                    <ViewPartecipants
                        show={showPartecipants}
                        onHide={() => setShowPartecipants(false)}
                        activity={props.activity}
                        online={props.online}
                        partecipanti={partecipanti}
                    />
            </div>

    )
}