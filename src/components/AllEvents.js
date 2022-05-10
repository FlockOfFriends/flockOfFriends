import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import DateFunction from './DateFunction'

const AllEvents = ({location, toggleApi, eventType, dateValue}) => {

    const [events, setEvents] = useState([])
    const searchDate = DateFunction(dateValue);
    console.log("SEARCH DATE", searchDate)

  useEffect(() => {
    const configTicket = {
      method: "get",
      url: `https://app.ticketmaster.com/discovery/v2/events`,
      params: {
        apikey: "NJCKlZmMAiwCVsFMlf33AlMF11d5iusP",
        city: location,
        // classificationName: eventType,
        startDateTime: searchDate
      },
    };
    axios(configTicket)
      .then(function (response) {
        const results = response.data._embedded.events;
        console.log(results)
        setEvents(response.data._embedded.events)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [toggleApi])

  
    return (
        <ul className="catalogue">
        { events.map((event) => {
            
            return (
              <li key={event.id}>
                <Link to={`/event/${event.id}`}>
                <img 
                src={event.images[0].url} 
                alt={`Placeholder`} />
                </Link>
              </li>
            )
        })}
      </ul>

    )

}
export default AllEvents