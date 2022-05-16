import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import firebase from "./firebase";
import { getDatabase, ref, push, onValue } from "firebase/database";

// image import
import iconClock from "../assets/iconClock.svg";
import iconPeople from "../assets/iconPeople.svg";


const EventDetails = () => {
  const [userInput, setUserInput] = useState("");
  const [firedata, setFiredata] = useState([]);
  const { eventID } = useParams();
  const [detailsArray, setDetailsArray] = useState({ loading: false });
  const [showButton, setShowButton] = useState(false);
  

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
      const updatedArray = emptyArray.filter(
        (item) => item.name.id === eventID
      );

      if (updatedArray.length === 0) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
      setFiredata(updatedArray);
    });
  }, [eventID]);

   // Function to convert date
  const convertDate = (date) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let firstDate = date;
    let secondDate =  new Date(firstDate);
    let finalDate = secondDate.toLocaleString('en-US', options);
    return finalDate;
  }

    // Function to convert time

  const convertTime = (time) => {
    let firstTime = time
    let secondTime = new Date(firstTime)
    let finalTime = secondTime.toLocaleTimeString('en-US');
    return finalTime
  }

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // function to return index of highest quality image
  const getImage = () => {
    if (detailsArray.loading === true ) {
      const largeWidthPhoto = Math.max(...detailsArray.images.map(function(i) {return i.width}));
      const largePhotoIndex = detailsArray.images.map(e => e.width).indexOf(largeWidthPhoto);
      return largePhotoIndex;
    }
  }
  // save index of highest quality image in a variable
  const imageBig = getImage();

  // Form submission that will store our new firebase data on submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // create a reference to our database
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    if (!userInput) {
      alert("Please enter your host name");
    } else {
      const uniqueInput = {
        userInput,
        id: eventID,
        title: detailsArray.name,
        img: detailsArray.images[imageBig].url,
        // start: detailsArray.dates.start.localDate,
        // time: detailsArray.dates.start.localTime,
        dateTime: detailsArray.dates.start.dateTime,
        tickets: detailsArray.url,
        address: detailsArray._embedded.venues[0].address.line1,
        city: detailsArray._embedded.venues[0].city.name,
        latitude: detailsArray._embedded.venues[0].location.latitude,
        longitude: detailsArray._embedded.venues[0].location.longitude,
        venue: detailsArray._embedded.venues[0].name,
        host:userInput,
        description: "TBD",
        attendees: [],          
      };
      console.log(uniqueInput);
      push(dbRef, uniqueInput);
      setUserInput("");
    }
  };

  return (
    <div className="eventDetails">
      {detailsArray.loading ? (
        <div className="wrapper">
          <div className="title">
            <div className="titleLeft">
              <h2>{detailsArray.name}</h2>
              
              <h5>{convertDate(detailsArray.dates.start.dateTime)}</h5>
              <h5>{convertTime(detailsArray.dates.start.dateTime)}</h5>
              <p>{detailsArray._embedded.venues[0].name}</p>
              {showButton ? (
                <div className="form">
                  <div className="formUser inputOff">
                    <label htmlFor="newLiked">Enter Host Name</label>
                    <input
                      className="hostInput"
                      type="text"
                      id="newLiked"
                      onChange={handleInputChange}
                      value={userInput}
                    />
                  </div>
                  <div className="formConditional">
                    <button
                      className="createEventButton buttonOff"
                    >
                      Create Event
                    </button>
                    <Link
                    className="buttonLink"
                    to={`/personal/${firedata[0].personalID}`}
                  >
                    Your Event
                  </Link>
                  </div>
                  
                </div>
              ) : (
                <form className="form" action="submit">
                  <div className="formUser">
                    <label htmlFor="newLiked">Enter Host Name</label>
                    <input
                      className="hostInput"
                      type="text"
                      id="newLiked"
                      onChange={handleInputChange}
                      value={userInput}
                    />
                  </div>
                  <div className="formConditional">
                    <button
                      className="createEventButton"
                      onClick={handleSubmit}
                    >
                      Create Event
                    </button>
                    <button className="createEventButton buttonOff">
                      Your Event
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="rightSide">
              <div className="img">
                <img src={detailsArray.images[imageBig].url} alt={detailsArray.name} />
              </div>
            </div>
          </div>
          <div className="titleBottom">
            <div className="titleText">
              <span>
                <img className="icons" src={iconPeople} alt="people icon" />
              
              <p>
                {detailsArray._embedded.venues[0].address.line1},{" "}
                {detailsArray._embedded.venues[0].city.name},{" "}
                {detailsArray._embedded.venues[0].state.name}
              </p>
              </span>
              <span >
                <img className="icons" src={iconClock} alt="clock icon" />
              
              <p>{detailsArray.dates.start.localTime}</p>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventDetails;
