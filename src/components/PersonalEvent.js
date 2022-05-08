import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, get } from "firebase/database";
import { useParams } from "react-router-dom";
import firebase from "./firebase";

const PersonalEvent = ({liked}) => {
  const [firedata, setFiredata] = useState([]);
  const { personalID } = useParams();
  console.log('hello', personalID)

  useEffect(() => {

    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const userID = '-N1_by51dcpV7FYz8hBY';
  

  const userRef = ref(database, `/${personalID}`)
  get(userRef).then((data) => {
  const mydata = data.val()
  setFiredata(mydata)
}).catch((error) => {
  console.log(error)
})

  }, []);

  return (
    <div>
      <h3>My Unique Event</h3>

      {firedata ? (
        <div>
          <h4>Placeholder for more</h4>
          <p>{firedata.title}</p>
          <p>{firedata.userInput}</p>
          

        </div>
      ) : null}

    </div>
  );
};

export default PersonalEvent;