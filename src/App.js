import "./style/sass/App.scss";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import {useParams} from 'react-router-dom'
// import axios from "axios";
import { getDatabase, ref, onValue } from "firebase/database";

import firebase from "./components/firebase";

// components
import AllEvents from "./components/AllEvents";
import EventDetails from "./components/EventDetails";
import PersonalHub from "./components/PersonalHub";
import PersonalEvent from "./components/PersonalEvent";
import DatePicker from "react-date-picker";

// images
import search from "./images/search.png";

function App() {

  // Lets mutate the Date data immediately
  

  const [location, setLocation] = useState("")
  const [dateValue, setDateValue] = useState(new Date());
  const [dateEndValue, setDateEndValue] = useState(new Date());
  const [toggleApi, setToggleApi] = useState(false)
  const [status, setStatus] = useState([])
  const [eventType, setEventType] = useState("")
  const [locationSearchShow, setLocationSearchShow] = useState(true);
  const [eventTypeShow, setEventTypeShow] = useState(true);
  const [eventGenre, setEventGenre] = useState("choose a genre");


  const handleSubmit = (event) => {
    event.preventDefault();
    setToggleApi(!toggleApi);
    // write a function that clears and resets all search ui input fields
  };

  const handleShowEventType = () => {
    setEventTypeShow(!eventTypeShow);

    console.log("event type bar", eventTypeShow);
  }

  const handleShowLocationSearchbar = () => {
    setLocationSearchShow(!locationSearchShow);

    console.log("locationSearchShow state!", locationSearchShow)
  }

  const handleEventGenre = () => {
    const switchGenreText = () => {
      console.log("THIS");
    };

    setEventGenre(switchGenreText());
  }


  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push(data[key]);
      }
      setStatus(newState);
    });
  }, []);

  return (
    <div className="App">
      <header>
        <nav>
          <form className="form" onSubmit={handleSubmit}>
            <div className={locationSearchShow ? "searchLocation" : "searchLocation longer"}>
              <label onClick={(e) => {e.preventDefault(); handleShowLocationSearchbar()}}>

                <p className="searchLabelText">Location</p>
                <input
                  type="text"
                  className="searchLocationInput"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="city, country, etc"
                />
              </label>
            </div>

            <div className="searchDateStart">
              <label
              onClick={(e) => {e.preventDefault()}} className="searchStartDate">
                <p className="searchLabelText">Start Date</p>
                <DatePicker
                closeCalendar={false}
                name="datePicker"
                id="datePicker"
                value={dateValue}
                onChange={setDateValue}
                />
              </label>
            </div>

            <div className="searchDateEnd">
              <label 
              onClick={(e) => {e.preventDefault()}} 
              className="searchEndDate">
                <p>End Date</p>
                <DatePicker
                dateFormat="dd/MM/yyyy"
                closeCalendar={false}
                name="datePicker"
                id="datePicker"
                value={dateEndValue}
                onChange={setDateEndValue}
                
                />
              </label>
            </div>

            <div className="searchEventType" onClick={handleShowEventType}>
              <label
              onChange={(e) => setEventType(e.target.value)}
              onClick={(e) => {e.preventDefault();
              handleShowEventType()}}>
                <p>Event Type</p>
                <p className="eventTypeGenre">{eventGenre}</p>
                <div className={eventTypeShow ? "radioEventList" : "radioEventList show"}>
                  <label htmlFor="allEvents" onClick={() => {setEventGenre("All Events")}}>All Events</label>
                  <input type="radio" name="eventChoice" id="allEvents" value=""/>

                  <label htmlFor="sports" onClick={() => {setEventGenre("Sports")}}>Sports</label>
                  <input type="radio" name="eventChoice" id="sports" value="Sports"/>

                  <label htmlFor="music" onClick={() => {setEventGenre("Music")}}>Music</label>
                  <input type="radio" name="eventChoice" id="music" value="Music" />

                  <label htmlFor="artsTheatre" onClick={() => {setEventGenre("Arts & Theatre")}}>Arts & Theatre</label>
                  <input type="radio" name="eventChoice" id="artsTheatre" value="Art"/>
                </div>
              </label>
            </div>

            <div className="searchSubmit">
              <input
              className="searchSubmitButton"
              type="image"
              alt="submit"
              value="Search"
              src={search}
              />
            </div>
          </form>
          <Link to="/">Home</Link>
          <Link to="/personalhub">
            <p>{status.length}</p>
          </Link>
        </nav>
      </header>
     
     <Routes>
        <Route path="/" 
        element={
        <AllEvents 
        location={location} 
        eventType={eventType}
        dateValue={dateValue}
        dateEndValue={dateEndValue}
        toggleApi={toggleApi} />} />

        <Route path="/event/:eventID" element={<EventDetails />} />
        <Route path="/personal/:personalID" element={<PersonalEvent />} />

        <Route path="/personalhub" element={<PersonalHub />} />
      </Routes>
    </div>
  );
}

export default App;
