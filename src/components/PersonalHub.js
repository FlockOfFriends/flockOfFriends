import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import firebase from "./firebase";

const PersonalHub = () => {
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    // create a variable that holds our database details
    const database = getDatabase(firebase);

    // we then create a variable that makes reference to our database
    const dbRef = ref(database);

    // add an event listener to that variable that will fire
    // from the database, and call that data 'response'.
    onValue(dbRef, (response) => {
      // here we're creating a variable to store the new state we want to introduce to our app
      const newState = [];

      // here we store the response from our query to Firebase inside of a variable called data.
      // .val() is a Firebase method that gets us the information we want
      const data = response.val();
      console.log(data)
      // data is an object, so we iterate through it using a for in loop to access each book name

      for (let key in data) {
        // inside the loop, we push each book name to an array we already created inside the onValue() function called newState
        newState.push(data[key]);
      }
      console.log(newState)
      // then, we call setBooks in order to update our component's state using the local array newState
      setLiked(newState);
    });
  }, []);

  return (
    <div>
      <h3>Personalized Event Hub!</h3>
      <ul>
        {liked.map((like) => {
          return (
            <li>
              <p>{like.id}</p>
              <p>{like.title}</p>
              <p>{like.userInput}</p>
              <img src={like.img} alt={`${like.title}`} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PersonalHub;
