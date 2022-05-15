import { useState, useEffect } from "react";

import { getDatabase, ref, onValue, push, get, remove, child } from "firebase/database";

import { useParams } from "react-router-dom";
import firebase from "./firebase";

// importing images
// import iconClock from "../assets/iconClock.svg";
import iconLocation from "../assets/iconLocation.svg";
import iconPeople from "../assets/iconPeople.svg";
import iconTicket from "../assets/iconTicket.svg";
import iconCal from "../assets/iconCal.svg";

const PersonalEvent = ({ liked }) => {
  const [guestName, setGuestName] = useState([]);
  const [guestList, setGuestList] = useState([])

  // const [guestID, setGuestID] = useState()

  const [firedata, setFiredata] = useState([]);
  // work with this one:
  const [formInput, setFormInput] = useState([]);
  const { personalID } = useParams();
  // console.log("personalID", personalID);

  useEffect(() => {
    const database = getDatabase(firebase);

    const userRef = ref(database, `/${personalID}`);
    get(userRef)
      .then((data) => {
        const mydata = data.val();

        console.log(mydata);
        setFiredata(mydata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  // Function to convert date
  const convertDate = (date) => {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let firstDate = date;
    let secondDate = new Date(firstDate);
    let finalDate = secondDate.toLocaleString("en-US", options);
    return finalDate;
  };

  // Function to convert time

  const convertTime = (time) => {
    let firstTime = time;
    let secondTime = new Date(firstTime);
    let finalTime = secondTime.toLocaleTimeString("en-US");
    return finalTime;
  };

  const getDay = (userDate) => {
    let firstDate = userDate;
    let secondDate = new Date(firstDate);
    let justDay = secondDate.getDate();
    return justDay;
  };

  const getMonth = (userDate) => {
    let options = {
      month: "long",
    };
    let firstDate = userDate;
    let secondDate = new Date(firstDate);
    let finalDate = secondDate.toLocaleString("en-US", options);
    return finalDate;
  };


  // Function for handling form CHANGES
  const handleInputChange = (event) => {
    setGuestName(event.target.value);
  };

  // Function for handling form SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
   
    const database = getDatabase(firebase);
    const newGuestName = {
      guest: guestName,

    };

    const childRef = ref(database, `/${personalID}/attendees`);

    const addAttendee = (newName) => {
      return push(childRef, newName)
    }
    addAttendee(newGuestName)


    onValue(childRef, (response) => {
      const emptyArray = [];
      const data = response.val();
      for (let key in data) {
        // pushing the values from the object into our emptryArray
        emptyArray.push({ personalID: key, name: data[key] });
      }  
      setGuestList(emptyArray)
    });

    setGuestName('')
  }


  const handleRemoveName = (attendee) => {

    // accessing firebase data and creating a reference to the attendee's unique ID in order to remove them from the guest list one at a time:
    const database = getDatabase(firebase)
    const childRef = ref(database, `/${personalID}/attendees/${attendee}`)
    remove(childRef)

    // creating a reference to the updated guestlist (after name removal):
    const guestListRef = ref(database, `/${personalID}/attendees`)
    
    // updating guestlist display:
    onValue(guestListRef, (response) => {
      const emptyArray = [];
      const data = response.val();
      for (let key in data) {
        // pushing the values from the object into our emptryArray
        emptyArray.push({ personalID: key, name: data[key] });
      }  
      setGuestList(emptyArray)
    })
  };

  return (
    <div className="personalEvent">
      {firedata ? (
        <div className="wrapper">
          <div className="title">
            <div className="img">
              <img src={firedata.img} alt={`${firedata.title} event`} />
            </div>
            <div className="titleBottom">
              <div className="titleText">
                <h2>{firedata.title}</h2>
                <h5>
                  {convertDate(firedata.dateTime)} / {convertTime(firedata.dateTime)}
                </h5>
                <p>
                  {firedata.address}, {firedata.city}
                </p>
              </div>
              <div className="rsvp">
                <span className="iconCalendar">
                  <p className="getMonth">{getMonth(firedata.dateTime)}</p>
                  <p className="getDay">{getDay(firedata.dateTime)}</p>
                  
                  {/* <img src={iconCal} alt="Calendar icon" /> */}
                </span>

                <button className="rsvpButton" type="button">
                  RSVP
                </button>
                <button className="rsvpButton" type="button">
                  INTEREST
                </button>
              </div>
            </div>
          </div>

          <form action="submit" className="form">
            <div>
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                id="eventName"
                onChange={handleInputChange}
                value={formInput}
              />
              <label htmlFor="hostName">Host Name</label>
              <input
                type="text"
                id="hostName"
                onChange={handleInputChange}
                value={formInput}
              />
              <button onClick={handleSubmit}>SUBMIT</button>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                id="description"
                onChange={handleInputChange}
                value={formInput}
              />
            </div>
          </form>

          <div className="details">
            <h2>Details</h2>
            <div className="subDetails">
              <span>
                <img src={iconPeople} alt="people icon" />
              </span>
              <p>Respondants/Attending</p>
            </div>

            <div className="subDetails">
              <span>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/education-340/100/Tilda_Icons_1ed_timer-1024.png"
                  alt=""
                />
              </span>
              <p>Hosts</p>
            </div>

            <div className="subDetails">
              <span>
                <img src={iconLocation} alt="location icon" />
              </span>
              <p>{firedata.venue}</p>
            </div>

            <div className="subDetails">
              <span>
                <img src={iconTicket} alt="tickets icon" />
              </span>
              <p>
                Tickets <a href={`${firedata.tickets}`}>here</a>
              </p>
            </div>

            <p className="blurb">
              {firedata.userInput}
              Blurb that is created by users Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Eaque ducimus distinctio, nisi
              repellat, labore quasi, tenetur ex voluptatibus nemo eos expedita
              numquam provident ab rerum praesentium error ad facilis deleniti!
            </p>
          </div>
          <div className="map">
            <iframe
              title="Google maps"
              className="googlemap"
              src={`https://maps.google.com/maps?q=${firedata.latitude}, ${firedata.longitude}&output=embed`}
              loading="lazy"
            ></iframe>
          </div>

          <div className="attendees">
            <h2>Attending</h2>
            <ul className="guest">
              <li className="guestName">
                <form className="addGuest" action="submit">
                  <label htmlFor="attendeeName">Put Yourself on the Guest List:</label>
                  <input 
                    id="attendeeName"
                    type="text" 
                    onChange={handleInputChange}
                    value={guestName}
                  />
                  <button className="addButton" onClick={handleSubmit}>Add Name</button>
                </form>
              </li>
            </ul>
            <ul className="addedNames">
              { guestList.map((guestName) => {
                    return (
                      <li key={guestName.name.guest}  className="guestName">
                        <span className="avatar">
                          <img
                            src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/sloth_lazybones_sluggard_avatar-1024.png"
                            alt=""
                          />
                        </span>
                        <p>{guestName.name.guest}</p>
                        <button className="removeButton" onClick={() => handleRemoveName(guestName.personalID)}> Can't Make It</button>
                      </li>
                      
                    )
                })}
            </ul>
          </div>

          <div className="socials">
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              className="twitter-share-button"
              data-show-count="false"
            >
              Tweet
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PersonalEvent;
