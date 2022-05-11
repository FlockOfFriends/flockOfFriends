import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { Link } from "react-router-dom";

import firebase from "./firebase";

const PersonalHub = () => {
  const [liked, setLiked] = useState([]);
  const [eventInput, setEventInput] = useState('');

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();

      for (let key in data) {
        // pushing the values from the object into our newState array
        newState.push({ personalID: key, name: data[key] });
      }
      // console.log("hub", newState);
      setLiked(newState);
    });
  }, []);

  return (
    <div className="personalHub">
      <h3>Personalized Event Hub</h3>
      <div className="wrapper">
        <ul className="catalogue">
          {liked.map((like) => {
            return (
                <li key={like.personalID}>
                  <h4>{like.name.title}</h4>
                  <p>Make This Your Event!</p>
                  <div className="eventContent">
                    <Link to={`/personal/${like.personalID}`}>
                      <div className="personalEventImg">
                        <img src={like.name.img} alt={`Placeholder`} />
                      </div>
                    </Link>
                    <div className="hubText">
                      <form action="submit">
                        <label htmlFor="newEvent" className="sr-only">Make This Your Event</label>
                        <input 
                          type="text" 
                          id="newEvent" 
                          placeholder="Event Name"
                        />
                        <label htmlFor="eventDescription"className="sr-only">Type a message</label>
                        <textarea 
                          name="eventDescription" 
                          id="eventDescription" 
                          cols="30" 
                          rows="5"
                          placeholder="Write your event description here so you and your flock can get excited!">
                        </textarea>
                        {/* need to add an onSubmit function to the button */}
                        <button>Create Event</button>
                      </form>
                    </div>  
                  </div>
                </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PersonalHub;
