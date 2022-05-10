import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";

import firebase from "./firebase";

const PersonalHub = () => {
  const [liked, setLiked] = useState([]);

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
      console.log("hub", newState);
      setLiked(newState);
    });
  }, []);

  return (
    <div>
      <h3>Personalized Event Hub!</h3>
      <ul className="catalogue">
        {liked.map((like) => {
          return (
            <li key={like.personalID}>
              <p>{like.name.title}</p>
              <Link to={`/personal/${like.personalID}`}>
                <div className="personalEventImg">
                  <img src={like.name.img} alt={`Placeholder`} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PersonalHub;
