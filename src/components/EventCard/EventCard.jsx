import './EventCard.css'
import {Calendar, Users, MapPin} from 'lucide-react'
export function EventCard(props){
    const getActivityClass = (activity) => {
        switch (activity){
            case 'Sport': return 'Activity-sport';
            case 'Tech': return 'Activity-tech';
            case 'Gaming': return 'Activity-gaming';
            default: return 'Activity-social';

        }
    }
    return(
            <div className='infoCard shadow'>
                <div className="d-flex  justify-content-between">
                    <span className={`badge rounded-pill px-3 py-2 ${getActivityClass(props.activity)}`}>
                        {props.activity}
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
                        <MapPin size={20} color='#7a7a7a' />
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
                <button className='details px-4 py-3'>View Details</button>
            </div>

    )
}