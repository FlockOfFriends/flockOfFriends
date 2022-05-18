import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";


const AllEvents = ({location, toggleApi, eventType, dateValue, dateEndValue}) => {

  const [events, setEvents] = useState([])
  const [errorState, setErrorState] = useState(0);
  // errorState 0 = No Results found
  // errorState 1 = Between 1 and 5 results returned
  // errorState 2 = Many results found. Good!
  // errorState 3 = Something went wrong! Unknown error returned.

  // function to convert date into a readable format
  const dateFunction = (userDate, defaultTime) => {
    const todaysDate = userDate
    const altDate = todaysDate.toISOString();
    const newDate = altDate.replace(/[/]/g, "-");
    const shortDate = newDate.substring(0,newDate.indexOf("T"));
    const finalDate = `${shortDate}${defaultTime}`; 
    return finalDate.toString();
  }

  // api call to ticketmaster to receive events
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

        const errorHandling = response.data.page.totalElements;

        // error handling, set error state depending on the amount of events receieved from call.
        if( errorHandling === 0 ) {
          setErrorState(0);
        } else if( errorHandling > 0  && errorHandling < 5 ) {
          setErrorState(1);
          setEvents(response.data._embedded.events.filter(dat => dat._embedded !== undefined))
        } else {
          setErrorState(2);
          setEvents(response.data._embedded.events.filter(dat => dat._embedded !== undefined))
        } 

      })
      .catch(function (error) {
        setErrorState(3);
      });
  }, [toggleApi]);


  // depending on error state, run loading spinner, give search suggestions, or display returned events to the user
    if(events.length === 0) {
      return (
            <li className="error">
              <LoadingSpinner />
              <div className="errorMessage">
                <h2>Loading...</h2>
              </div>
            </li>
      )
    } else if( errorState === 0) {
        return (
          <div className="wrapper error">
            <div className="errorHints">
              <h3>No events match your search.</h3>
              <ul>
                <li>
                  <p className="errorBold">Try updating your location.</p>
                  <p>Include your province or state after a comma, e.g. "Reno, Nevada" or "Calgary, Alberta"</p>
                </li>
                <li>
                  <p className="errorBold">Try expanding your date range</p>
                  <p>Search for events happening weeks away, this gives you enough time to tell your friends!</p>
                </li>
                <li>
                  <p className="errorBold">Try searching for all event types</p>
                  <p>Choosing "All Events" will give you the most search results to choose from.</p>
                </li>
                <li>
                  <p className="errorBold">Check your spelling</p>
                </li>
              </ul>
            </div>
          </div>
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


  // display events to the user
    return (
      <>
        <h2>Upcoming Events</h2>
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
                    <h3 className="allEventsH3">{event.name}</h3>
                    <h5 className="allEventsH5">{convertDate(event.dates.start.dateTime)}</h5>
                    </div>
                  </li>
                ) 
            })}
          </div>
        </ul>
      </>
        
    )
};
export default AllEvents;
