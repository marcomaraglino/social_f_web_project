import {EventCard} from "../../components/EventCard/EventCard.jsx";
import './FeedPage.css'

export function FeedPage(){

    return(
        <div className='cardsContainer'>
            <div className='infoContainer'>
                <div className='NameParag'>
                    <h2>Discover Events</h2>
                    <p>Find amazing activities near you</p>
                </div>
                <button>+ Create Event</button>
            </div>
            <div className='cards'>

                <EventCard activity='Tech' nome='Progetto' descrizione='Progetto di programmazione'
                           data='Sat, Jun 1 at 18:00' luogo='Bari BA' partecipanti='7/10'/>
                <EventCard activity='Sport' nome='Progetto' descrizione='Progetto di programmazione'
                           data='Sat, Jun 1 at 18:00' luogo='Bari BA' partecipanti='7/10'/>
                <EventCard activity='Social' nome='Progetto' descrizione='Progetto di programmazione'
                           data='Sat, Jun 1 at 18:00' luogo='Bari BA' partecipanti='7/10'/>
                <EventCard activity='Gaming' nome='Progetto' descrizione='Progetto di programmazione'
                           data='Sat, Jun 1 at 18:00' luogo='Bari BA' partecipanti='7/10'/>


            </div>
        </div>



)
}