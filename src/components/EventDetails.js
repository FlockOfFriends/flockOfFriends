import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import firebase from "./firebase";
import { getDatabase, ref, push } from 'firebase/database';


const EventDetails = () => {
  const [userInput, setUserInput] = useState('');

  const { eventID } = useParams();
  const [detailsArray, setDetailsArray] = useState({ loading: false });


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
        console.log(data);
        setDetailsArray(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [eventID]);


  const handleInputChange = (event) => {
  console.log(event.target.value)
  setUserInput(event.target.value);
}

const handleSubmit = (event) => {
    event.preventDefault();
    // create a reference to our database
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // push the value of the `userInput` state to the database
    let removeWhite = userInput.trim().split(/[\s,\t,\n]+/).join(' ');
    let addHyphen = removeWhite.replace(/ /g, "-")
    let removeAppost = addHyphen.replaceAll("'", "")
    let lowered = removeAppost.toLowerCase()

    console.log(lowered)
    const uniqueInput = {userInput, id: eventID, title: detailsArray.name, img: detailsArray.images[1].url}
    
    push(dbRef, uniqueInput);
    setUserInput('');
  }

  return (
    <div>
      {detailsArray.loading ? (
        <div>
          <div>
            <h2>{detailsArray.name}</h2>
            <h3>{detailsArray.classifications[0].genre.name}</h3>
            <p>Placeholder</p>
          </div>
          <div>
            <img src={detailsArray.images[1].url} alt={`Placeholder`} />
          </div>

          <form action="submit">
            <label htmlFor="newLiked">Add an event to your list</label>
            <input 
            type="text" 
            id="newLiked" 
            onChange={handleInputChange}
            value={userInput}
            />
            <button onClick={handleSubmit}>Like Event</button>
          </form>
        </div>
      ) : null}
      
    </div>
  );
};

export default EventDetails;
