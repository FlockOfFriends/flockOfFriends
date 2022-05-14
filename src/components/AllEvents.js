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

        
        if(response.data._embedded === undefined) {
          console.log("NO RESULTS RETURNED BRO")
          
          setEvents([]);

          }



        const results = response.data._embedded.events;
        console.log("results", results);
        setEvents(response.data._embedded.events);
      })
      .catch(function (error) {
        console.log(error);
        setEvents([]);
      });

  }, [toggleApi]);

    return (
        <ul className="catalogue">
        { events.map((event) => {

          // filter through images available and save index position of the largest for display
          const imagesArray = event.images;
          const largeWidthPhoto = Math.max(...imagesArray.map(function(i) {return i.width}));
          const largePhotoIndex = imagesArray.map(e => e.width).indexOf(largeWidthPhoto);

            return (
                  <li key={event.id}>
                    <Link to={`/event/${event.id}`}>
                        <img 
                          src={event.images[largePhotoIndex].url} 
                          alt={`Placeholder`} />
                    </Link>
                  </li>
            )
        })}
      </ul>

    )

  return (
    <ul className="catalogue">
      {events.map((event) => {
        return (
          <li key={event.id}>
            <Link to={`/event/${event.id}`}>
              <div className="imgContainer">
                <img src={event.images[0].url} alt={`Placeholder`} />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default AllEvents;
