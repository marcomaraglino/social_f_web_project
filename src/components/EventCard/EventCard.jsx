import './EventCard.css'
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
    return(
            <div className='infoCard shadow'>
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
                <h5>{props.nome}</h5>
                <p>{props.descrizione}</p>
                <div className='otherInfo'>
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
                <button className='btn btn-gradient sdetails px-4 py-3'>View Details</button>
            </div>

    )
}