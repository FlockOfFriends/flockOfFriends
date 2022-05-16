import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import failedEventCall from "./failedEventCall";
import LoadingSpinner from "./LoadingSpinner";


const AllEvents = ({location, toggleApi, eventType, dateValue, dateEndValue}) => {

  const [events, setEvents] = useState([])
  const [errorState, setErrorState] = useState(0);

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
        const errorHandling = response.data.page.totalElements;
        console.log("brian error stuff here", errorHandling);
        console.log(results);
        // insert state set to false intially, if false display spinner.
        // update spinner icon/loading state here

        if(errorHandling > 0) {
          setEvents(response.data._embedded.events);
          setErrorState(0);
        } else {

        }

      })
      .catch(function (error) {
        console.log(error);
        // if we catch an error, clear events array
        // setEvents([failedEventCall]);
      });
  }, [toggleApi]);

    // if events array is cleared from error, return search suggestions.
    if(events.length === 0) {

      // console.log("BRIANAAAAAAAAAAA", events[0]);

      return (
            <li className="error">
              <LoadingSpinner />
              <div className="errorMessage">
                <h1>Loading...</h1>
              </div>
            </li>
      )
    } 
    
    // else if(events[0].name === "fail") {

    //   console.log("FAILED TO RETURN EVENTS");
    //   return (
    //         <div className="errorHints">
    //           <h3>Oh No! No events match your search.</h3>
    //           <ul>
    //             <li>
    //               <p>Try updating your location</p>
    //             </li>
    //             <li>
    //               <p>Try expanding your date range</p>
    //             </li>
    //             <li>
    //               <p>Try searching for all event types</p>
    //             </li>
    //             <li>
    //               <p>Check your spelling</p>
    //             </li>
    //           </ul>
    //         </div>

    //   )
    // }

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
          // filter through images available and save index position of the largest for display
          const imagesArray = event.images;
          const largeWidthPhoto = Math.max(...imagesArray.map(function(i) {return i.width}));
          const largePhotoIndex = imagesArray.map(e => e.width).indexOf(largeWidthPhoto);

            return (
         
              <li 
              className="allEventContainer"
              key={event.id}>
                <Link to={`/event/${event.id}`}>
                <img
                className="allEventImage" 
                src={event.images[largePhotoIndex].url} 
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
};
export default AllEvents;
