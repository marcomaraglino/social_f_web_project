import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "@/utils/AuthProvider.jsx";





export const EventContext = createContext();

export const EventProvider = ({children}) => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const {fetchWithAuth} = useContext(AuthContext);
    useEffect(() => {
        fetch(import.meta.env.VITE_API_BASE_URL+'/events')
            .then((res) => {
                if(!res.ok)
                    throw new Error('Errore nella risposta');
                return res.json();
            })
            .then((data) => {
                setEvents(data.events);
            })
            .catch((err) => {
                console.error('Errore nel fetch', err);
                setError("Errore nel caricamento degli eventi");
            })
    }, []);

    const joinEvent = async (eventId) => {
        if (!eventId) {
            console.error("ID evento mancante in handleJoin!");
            setError("ID evento non trovato.");
            return;
        }
        fetchWithAuth(import.meta.env.VITE_API_BASE_URL + '/events/' + eventId + '/subscribe',{
            method: 'POST',

        })
            .then((res)=>{
                if(!res.ok) throw new Error("Errore nella risposta");
                return res.json();
            })
            .then((data)=>{
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event._id === eventId ? {...event, subscribe: data.subscribe} : event
                    )
                );
            })
            .catch((err)=>{
                console.error('Errore nel fetch', err);
                setError("Errore nell'iscrizione all'evento");
            })
    }

    const getEventById = (eventId) => {
        if (!eventId) {
            console.error("ID evento mancante in getEventById!");
            return null;
        }
        return events.find(event => event._id === eventId);
    }

    return (
        <EventContext.Provider value={{events, setEvents, error, setError, joinEvent, getEventById}}>
            {children}
        </EventContext.Provider>
    )
}