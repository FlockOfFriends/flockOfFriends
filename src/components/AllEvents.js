import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const AllEvents = ({location, toggleApi, eventType, dateValue, dateEndValue}) => {

  const [events, setEvents] = useState([])

  const dateFunction = (userDate, defaultTime) => {
    const todaysDate = userDate
    const altDate = todaysDate.toISOString();
    const newDate = altDate.replace(/[/]/g, "-");
    const shortDate = newDate.substring(0,newDate.indexOf("T"));
    const finalDate = `${shortDate}${defaultTime}`; 
    return finalDate.toString();
  }


  useEffect(() => {
  
  const ourStart = dateFunction(dateValue, "T23:00:00Z")
  const ourEnd = dateFunction(dateEndValue, "T23:59:59Z")


    const configTicket = {
      method: "get",
      url: `https://app.ticketmaster.com/discovery/v2/events`,
      params: {
        apikey: "NJCKlZmMAiwCVsFMlf33AlMF11d5iusP",
        city: location,
        classificationName: eventType,

        startDateTime: ourStart,
        endDateTime: ourEnd,
        size: "100",
        sort: "random"


      },
    };
    axios(configTicket)
      .then(function (response) {
        console.log(response)
        const results = response.data._embedded.events;
        console.log(results);
        
        setEvents(response.data._embedded.events);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [toggleApi])

    // Function to convert date
  const convertDate = (date) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let firstDate = date;
    let secondDate =  new Date(firstDate);
    let finalDate = secondDate.toLocaleString('en-US', options);
    return finalDate;
  }
  
    return (
        <ul className="allEvents">
          <div className="wrapper">
        { events.map((event) => {
            
            return (

              <li 
              className="allEventContainer"
              key={event.id}>
                <Link to={`/event/${event.id}`}>
                <img
                className="allEventImage" 
                src={event.images[6].url} 
                alt={`Placeholder`} />
                </Link>
                <div className="subtitle">
                <h2>{event.name}</h2>
                <h5>{convertDate(event.dates.start.dateTime)}</h5>
                </div>
              </li>

            )
            
        })}
        </div>
      </ul>

    )

  // return (
  //   <ul className="catalogue">
  //     {events.map((event) => {
  //       return (
  //         <li key={event.id}>
  //           <Link to={`/event/${event.id}`}>
  //             <div className="imgContainer">
  //               <img src={event.images[0].url} alt={`Placeholder`} />
  //             </div>
  //           </Link>
  //         </li>
  //       );
  //     })}
  //   </ul>
  // );
};
export default AllEvents;
