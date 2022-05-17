import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import firebase from "./firebase";

const PersonalHub = () => {
  const [liked, setLiked] = useState([]);
  // const [eventID, setEventID] = useState([]);

  const { personalID } = useParams();

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

  const handleRemoveEvent = (event) => {
    // accessing firebase data and creating a reference to the event's unique ID in order to remove it from the hub:
    const database = getDatabase(firebase);
    const childRef = ref(database, `/${event}`);
    remove(childRef);

    const eventRef = ref(database);

    // updating event display:
    onValue(eventRef, (response) => {
      const emptyArray = [];
      const data = response.val();
      for (let key in data) {
        // pushing the values from the object into our emptryArray
        emptyArray.push({ personalID: key, name: data[key] });
      }
      setLiked(emptyArray);
    });
  };

  return (
    <div className="personalHub">
      <h2>Personalized Event Hub</h2>
      <div className="wrapper">
        <ul className="catalogue">
          {liked.map((like) => {
            return (
              <li key={like.personalID}>
                <div className="eventContent">
                  <h3 className="personalHubH3">{like.name.title}</h3>
                  <Link className="links" to={`/personal/${like.personalID}`}>
                    <div className="personalEventImg">
                      <img src={like.name.img} alt={`Placeholder`} />
                    </div>
                  </Link>
                  <button
                    onClick={() => handleRemoveEvent(like.personalID)}
                    className="deleteButton"
                  >
                    Delete Event
                  </button>
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
