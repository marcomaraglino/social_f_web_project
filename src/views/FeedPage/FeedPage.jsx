import {EventCard} from "../../components/EventCard/EventCard.jsx";
import './FeedPage.css'
import {useState} from "react";
import {Link} from "react-router-dom";
const events=[
    {
        id:1,
        activity:'Sport',
        nome:'Progetto',
        descrizione:'Progetto di fondamenti web',
        data:'Sat, Jun 1 at 18:00',
        luogo:'Bari BA',
        partecipanti:'7/10'

    },
    {
        id:2,
        activity:'Sport',
        nome:'Progetto',
        descrizione:'Progetto di fondamenti web',
        data:'Sat, Jun 1 at 18:00',
        luogo:'Bari BA',
        partecipanti:'7/10'

    },
    {
        id:3,
        activity:'Gaming',
        nome:'Progetto',
        descrizione:'Progetto di fondamenti web',
        data:'Sat, Jun 1 at 18:00',
        luogo:'Bari BA',
        partecipanti:'7/10'

    },
    {
        id:4,
        activity:'Social',
        nome:'Progetto',
        descrizione:'Progetto di fondamenti web',
        data:'Sat, Jun 1 at 18:00',
        luogo:'Bari BA',
        partecipanti:'7/10'

    },

]
export function FeedPage(){

    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories =['All', 'Sport', 'Gaming', 'Tech', 'Social' ];
    const eventiFiltrati= selectedCategory==='All'
    ? events : events.filter((event)=>event.activity === selectedCategory)
    return(
        <div className='event-container'>
            <div className='event-header'>
                <div>
                    <h2>Discover Events</h2>
                    <p>Find amazing activities near you</p>
                </div>

                <Link to='create-event'>
                    <button className={'create-event rounded-pill px-4 py-2 text-nowrap font-normal'}>+ Create Event</button>
                </Link>
            </div>
            <div className='filters'>
                {categories.map((category)=>(
                    <button key={category} className={`rounded-pill px-4 py-2 text-nowrap ${
                        selectedCategory===category
                        ? "filter"
                        : "noselectedFilter"    
                    }`} onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
                <div className='card-grid'>
                    {eventiFiltrati.map((events)=>(

                            <EventCard activity={events.activity}
                                       nome={events.nome}
                                       descrizione={events.descrizione}
                                       data={events.data}
                                       luogo={events.luogo}
                                       partecipanti={events.partecipanti}
                            />

                    ))

                    }
                </div>

        </div>




)
}
