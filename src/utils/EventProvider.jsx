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

    const deleteEvent = async (eventId) => {
        if (!eventId) return false;
        try {
            const res = await fetchWithAuth(`${import.meta.env.VITE_API_BASE_URL}/events/${eventId}`, {
                method: 'DELETE'
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.message || "Errore nella cancellazione dell'evento");
            }
            // Rimuovi evento da stato
            setEvents(prev => prev.filter(event => event._id !== eventId));
            return true;
        } catch (err) {
            console.error('Errore nel cancellare evento:', err);
            setError("Errore nella cancellazione dell'evento");
            return false;
        }
    };

    const createEvent = async (eventData) => {
        try {
            const res = await fetchWithAuth(import.meta.env.VITE_API_BASE_URL + '/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || 'Errore nella creazione dell’evento');
            }

            const newEvent = data.post; // <-- usa "post" non "event"

            if (newEvent && newEvent._id) {
                setEvents(prev => [...prev, newEvent]);
            }

            return newEvent;
        } catch (error) {
            console.error('Errore nella creazione evento:', error);
            throw error;
        }
    };

    const updateEvent = (eventId, updatedData) => {
        if (!eventId) {
            console.error("ID evento mancante in updateEvent!");
            setError("ID evento non trovato.");
            return;
        }
        fetchWithAuth(import.meta.env.VITE_API_BASE_URL + '/events/' + eventId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then((res) => {
                if (!res.ok) throw new Error("Errore nella risposta");
                return res.json();
            })
            .then((data) => {
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event._id === eventId ? {...event, ...data} : event
                    )
                );
            })
            .catch((err) => {
                console.error('Errore nel fetch', err);
                setError("Errore nell'aggiornamento dell'evento");
            });
    }

    const joinEvent = async (eventId) => {
        if (!eventId) return;

        try {
            const res = await fetchWithAuth(`${import.meta.env.VITE_API_BASE_URL}/events/${eventId}/subscribe`, {
                method: 'POST'
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || 'Errore nella risposta');
            }

            // Se l'evento è stato eliminato (nessun partecipante rimasto)
            if (data.message?.includes("Evento eliminato")) {
                setEvents(prev => prev.filter(ev => ev._id !== eventId));
            } else if (data.post) {
                // Altrimenti aggiorna lo stato dell'evento
                setEvents(prev => prev.map(ev => ev._id === eventId ? data.post : ev));
            }

            return data;
        } catch (err) {
            console.error("Errore nel fetch", err);
        }
    }

    const getEventById = (eventId) => {
        if (!eventId) {
            console.error("ID evento mancante in getEventById!");
            return null;
        }
        return events.find(event => event._id === eventId);
    }

    return (
        <EventContext.Provider value={{events, setEvents, error, setError, joinEvent, getEventById, updateEvent, createEvent, deleteEvent}}>
            {children}
        </EventContext.Provider>
    )
}