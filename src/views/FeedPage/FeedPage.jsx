import {EventCard} from "../../components/EventCard/EventCard.jsx";
import {ViewDetails} from "../../components/ViewDetails/ViewDetails.jsx";
import './FeedPage.css'
import {useState} from "react";
import {Link, Route} from "react-router-dom";
const events=[
    {
        id:1,
        activity:'Sport',
        online:true,
        nome:'Progetto',
        descrizione:'Progetto di fondamenti web',
        data:'Sat, Jun 1 at 18:00',
        luogo:'Bari BA',
        partecipanti:'7/10'

    },
    {
        id:2,
        activity:'Sport',
        online:true,
        nome:'Progetto',
        descrizione:'Progetto di fondamenti web',
        data:'Sat, Jun 1 at 18:00',
        luogo:'Bari BA',
        partecipanti:'7/10'

    },
    {
        id:3,
        activity:'Gaming',
        online:true,
        nome:'Progetto',
        descrizione:'Progetto di fondamenti web',
        data:'Sat, Jun 1 at 18:00',
        luogo:'Bari BA',
        partecipanti:'7/10'

    },
    {
        id:4,
        activity:'Social',
        online:false,
        nome:'Progetto',
        descrizione:'Progetto di fondamenti web',
        data:'Sat, Jun 1 at 18:00',
        luogo:'Bari BA',
        partecipanti:'7/10'

    },
    {
        id:5,
        activity:'Social',
        online:true,
        nome:'Mincraftata',
        descrizione: 'io e claudio giochiamo a minecraft',
        data:'Sat, Jun 17 at 18:00',
        luogo:'Discord',
        partecipanti:'2/10'
    }
]


export function FeedPage(){

    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories =['All', 'Sport', 'Gaming', 'Tech', 'Social' ];
    const eventiFiltrati= selectedCategory==='All'
    ? events : events.filter((event)=>event.activity === selectedCategory)
    return(
        <div className='container event-container'>
            <div className='event-header'>
                <div>
                    <h2 className="h2 fw-bold text-dark mb-0">Discover Events</h2>
                    <p>Find amazing activities near you</p>
                </div>

                <Link to='/create-event'>
                    <button className={'btn btn-gradient create-event rounded-pill px-4 py-2 text-nowrap font-normal'}>+ Create Event</button>
                </Link>
            </div>
            <div className='filters'>
                {categories.map((category)=>(
                    <button key={category} className={`d-none d-sm-block btn btn-gradient rounded-pill px-4 py-2 text-nowrap ${
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
                                       key={events.id}
                                       nome={events.nome}
                                       online={events.online}
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
