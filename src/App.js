import "./style/sass/App.scss";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import {useParams} from 'react-router-dom'
// import axios from "axios";
import { getDatabase, ref, onValue } from "firebase/database";

import firebase from "./components/firebase";

// components
import BurgerMenu from "./components/BurgerMenu";
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
  const [eventTypeShow, setEventTypeShow] = useState(true);
  const [eventGenre, setEventGenre] = useState("choose a genre");
  const [shrinkHeader, setShrinkHeader] = useState(false);


  // clear all search inputs after form submission. not sure where to fire this.
  const clearSearchInputs = () => {
    setLocation("");
    setDateValue(new Date());
    setDateEndValue(new Date());
    setEventType("");
    setEventGenre("choose a genre");
  }

  //when user scrolls 200 px down, set state for shrinkHeader
  useEffect(() => {
    if(typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        setShrinkHeader(window.scrollY > 100)
      });
    }
  }, []);

  // function that checks if the current page is on the home page (root = /) and runs some code, otherwise it runs some different code. Implement to bring user to homepage if they use submission form from any other page.
  const checkURL = () => {
    const currentURL = window.location.pathname;
    if(currentURL !== "/") {
      console.log("I am not on the home page");
    } else {
      console.log ("I am on the home page");
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setToggleApi(!toggleApi);
    checkURL();
  };

  const handleShowEventType = () => {
    setEventTypeShow(!eventTypeShow);
  }

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      handleShowEventType();
    }
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
      <header className={ `header ${
        shrinkHeader ? "small" : ""
      }` }>
        <BurgerMenu />
        <nav  className={ `nav ${
        shrinkHeader ? "small" : ""
      }` }>
          <form className="searchForm" onSubmit={handleSubmit}>

            <div className="searchLocation">
              <label onClick={(e) => {e.preventDefault()}}>
                <p className="searchLabelText">Location</p>
                <input
                  tabIndex="0"
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
              onClick={(e) => {e.preventDefault()}} 
              className="searchStartDate">
                <p className="searchLabelText">Start Date</p>
                <DatePicker
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
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
                minDate={new Date()}
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
              tabIndex="0"
              onKeyDown={handleKeypress}
              onClick={(e) => {e.preventDefault();
              handleShowEventType()}}>
              

                <p>Event Type</p>
                <p className="eventTypeGenre">{eventGenre}</p>
                <div className={eventTypeShow ? "radioEventList" : "radioEventList show"}>

                  <label
                    tabIndex="0"
                    htmlFor="allEvents"
                    // onKeyDown={ (e) => {e.key === "Enter" ? setEventGenre("All Events") : null}}
                    onClick={() => {setEventGenre("All Events");
                    setEventType("")}}>
                    All Events
                  </label>

                  <input type="radio" name="eventChoice" id="allEvents" value=""/>

                  <label
                    tabIndex="0"
                    htmlFor="sports"
                    onClick={() => {setEventGenre("Sports");
                    setEventType("Sports")}}>
                    Sports
                  </label>

                  <input type="radio" name="eventChoice" id="sports" value="Sports"/>

                  <label
                    tabIndex="0"
                    htmlFor="music"
                    onClick={() => {setEventGenre("Music");
                    setEventType("Music")}}>
                    Music
                  </label>
                  
                  <input type="radio" name="eventChoice" id="music" value="Music" />

                  <label
                    tabIndex="0"
                    htmlFor="artsTheatre"
                    onClick={() => {setEventGenre("Arts & Theatre");
                    setEventType("Art")}}>
                    Arts & Theatre
                  </label>

                  <input type="radio" name="eventChoice" id="artsTheatre" value="Art"/>

                  <label
                    tabIndex="0"  
                    htmlFor="family"
                    onClick={() => {setEventGenre("Family");
                    setEventType("Family")}}>
                    Family
                  </label>

                  <input type="radio" name="eventChoice" id="family" value="Family"/>

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
        <Route
          path="/"
          element={
            <AllEvents
              location={location}
              eventType={eventType}
              dateValue={dateValue}
              dateEndValue={dateEndValue}
              toggleApi={toggleApi}
            />
          }
        />

        <Route path="/event/:eventID" element={<EventDetails />} />
        <Route path="/personal/:personalID" element={<PersonalEvent />} />

        <Route path="/personalhub" element={<PersonalHub />} />
      </Routes>
    </div>
  );
}

export default App;
