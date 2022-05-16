import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import failedEventCall from "./failedEventCall";
import LoadingSpinner from "./LoadingSpinner";


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

  console.log("Event Type", eventType)


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
        // console.log(results)
        const newResults = results.filter(dat => dat._embedded !== undefined)
        console.log("our new data", newResults);


        setEvents(newResults);
      })
      .catch(function (error) {
        console.log(error);
        // if we catch an error, clear events array
        setEvents([]);        
      });
  }, [toggleApi]);

    // if events array is cleared from error, return search suggestions.
    if(events.length === 0) {
      console.log("failed call", failedEventCall)
      return (
            <li className="error">
              <LoadingSpinner />
              <div className="errorMessage">
                <h1>Loading...</h1>
              </div>
              {/* <div className="errorHints">
                <h3>Search Suggestions</h3>
                <ul>
                  <li>
                    <p>Try updating your location</p>
                  </li>
                  <li>
                    <p>Try expanding your date range</p>
                  </li>
                  <li>
                    <p>Try searching for all event types</p>
                  </li>
                  <li>
                    <p>Check your spelling</p>
                  </li>
                </ul>
              </div> */}
            </li>
      )
    }

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
