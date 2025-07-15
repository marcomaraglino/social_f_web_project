import {EventCard} from "../../components/EventCard/EventCard.jsx";
import {ViewDetails} from "../../components/ViewDetails/ViewDetails.jsx";
import './FeedPage.css'
import {useContext, useState} from "react";
import {Link, Route} from "react-router-dom";
import {EventContext, EventProvider} from "@/utils/EventProvider.jsx";


export function FeedPage(){

    const {events, error} = useContext(EventContext);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories =['All', 'Sport', 'Gaming', 'Tech', 'Social' ];
    const eventiFiltrati= selectedCategory==='All'
    ? events : events.filter((event)=>event.category === selectedCategory)
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
            {error && <p className='text-danger'>{error}</p>}
                <div className='card-grid'>
                    {eventiFiltrati.map((event)=>(

                            <EventCard
                                       key={event._id}
                                       id={event._id}
                                       category={event.category}
                                       title={event.title}
                                       online={event.online}
                                       description={event.description}
                                       date={event.date}
                                       location={event.location}
                                       maxLength = {event.maxLength}
                                       max={event.max}
                                       subscribe={event.subscribe}
                            />

                    ))

                    }
                </div>

        </div>





    )
}
