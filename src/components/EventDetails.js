import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import firebase from "./firebase";
import { getDatabase, ref, push, onValue } from 'firebase/database';


const EventDetails = () => {
  const [userInput, setUserInput] = useState('');
  // const [newUrl, setNewUrl] = useState('')
  const [firedata, setFiredata] = useState([])
  const { eventID } = useParams();
  const [detailsArray, setDetailsArray] = useState({ loading: false });
  const [showButton, setShowButton] = useState(false)

// Ticketmaster API Call for Individual Event 
  useEffect(() => {
    const configDetails = {
      method: "get",
      url: `https://app.ticketmaster.com/discovery/v2/events/${eventID}`,
      params: {
        apikey: "NJCKlZmMAiwCVsFMlf33AlMF11d5iusP",
      },
    };
    axios(configDetails)
      .then(function (response) {
        const data = { ...response.data, loading: true };
        setDetailsArray(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [eventID]);

  // Checking to see for updates and getting the PersonalID
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      const emptyArray = [];
      const data = response.val();
      for (let key in data) {
        // pushing the values from the object into our emptryArray
        emptyArray.push({ personalID: key, name: data[key] });
      }
      const updatedArray = emptyArray.filter(item => item.name.id === eventID)

      if(updatedArray.length === 0 ) {
        setShowButton(false)
      } else {
        setShowButton(true)
      }
      setFiredata(updatedArray)
    }); 
  }, [eventID]);

  const handleInputChange = (event) => {
  setUserInput(event.target.value);
}

// Form submission that will store our new firebase data on submit
const handleSubmit = (event) => {
    event.preventDefault();
    // create a reference to our database
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // push the value of the `userInput` state to the database
    // let removeWhite = userInput.trim().split(/[\s,\t,\n]+/).join(' ');
    // let addHyphen = removeWhite.replace(/ /g, "-")
    // let removeAppost = addHyphen.replaceAll("'", "")
    // let lowered = removeAppost.toLowerCase()
    const uniqueInput = {
      userInput, id: eventID, 
      title: detailsArray.name, 
      img: detailsArray.images[1].url, 
      start: detailsArray.dates.start.localDate, 
      time: detailsArray.dates.start.localTime, 
      // priceMax: detailsArray.priceRanges[0].max, 
      // priceMin: detailsArray.priceRanges[0].min, 
      tickets: detailsArray.url, 
      address: detailsArray._embedded.venues[0].address.line1, 
      city: detailsArray._embedded.venues[0].city.name, 
      latitude: detailsArray._embedded.venues[0].location.latitude, 
      longitude: detailsArray._embedded.venues[0].location.longitude,
      venue: detailsArray._embedded.venues[0].name,
      host:userInput,
      attendees: [],
    }
    console.log(uniqueInput)
    push(dbRef, uniqueInput);
    setUserInput('');
  }

  return (
    <div>
      {detailsArray.loading ? (
        <div>
          <div>
            <h2>{detailsArray.name}</h2>
            {/* <h3>{detailsArray.classifications[0].genre.name}</h3> */}
            <p>Placeholder</p>
          </div>
          <div>
            <img src={detailsArray.images[1].url} alt={`Placeholder`} />
          </div>
          {
              showButton ?
              <Link to={`/personal/${firedata[0].personalID}`}>
                Link
                </Link>
              : (
            <form action="submit">
            <label htmlFor="newLiked">Add an event to your list</label>
            <input 
            type="text" 
            id="newLiked" 
            onChange={handleInputChange}
            value={userInput}
            />
            <button onClick={handleSubmit}>Like Event</button>
          </form>)
            }

          
        </div>
      ) : null}

        {/* <div>
      {firedata === eventID ? (
        <div>
        <a href={newUrl}>Link</a>
        </div>
        )
        : null }
      </div> */}
    </div>
  );
};

export default EventDetails;
