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
                  <div className="eventContent">
                    <Link to={`/personal/${like.personalID}`}>
                      <div className="personalEventImg">
                        <img src={like.name.img} alt={`Placeholder`} />
                      </div>
                      <div className="hubText">
                        <h4>{like.name.title}</h4>
                        <button>See Event</button>
                        <button>Delete Event</button>
                      </div>  
                    </Link>
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
