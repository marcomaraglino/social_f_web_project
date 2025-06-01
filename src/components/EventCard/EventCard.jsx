import './EventCard.css'
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
        <div className='cardContainer'>
            <div className='infoCard shadow'>
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className={`badge rounded-pill px-3 py-2 ${getActivityClass(props.activity)}`}>
                        {props.activity}
                    </span>
                </div>
                <h5>{props.nome}</h5>
                <p>{props.descrizione}</p>
                <div className='otherInfo'>
                    <p>{props.data}</p>
                    <p>{props.luogo}</p>
                    <p>{props.partecipanti}</p>
                    <div className='statsPartecipanti'>
                    </div>

                </div>
                <button>View Details</button>
            </div>
        </div>
    )
}