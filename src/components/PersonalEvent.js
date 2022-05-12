import { useState, useEffect } from "react";
import { getDatabase, ref, push, get } from "firebase/database";
import { useParams } from "react-router-dom";
import firebase from "./firebase";

// importing images
// import iconClock from "../assets/iconClock.svg";
import iconLocation from "../assets/iconLocation.svg";
import iconPeople from "../assets/iconPeople.svg";
import iconTicket from "../assets/iconTicket.svg";
import iconCal from "../assets/iconCal.svg";

const PersonalEvent = ({ liked }) => {
  const [firedata, setFiredata] = useState([]);
  // work with this one:
  const [formInput, setFormInput] = useState([]);
  const { personalID } = useParams();
  // console.log("personalID", personalID);

  useEffect(() => {
    const database = getDatabase(firebase);
    // const dbRef = ref(database);
    // const userID = "-N1_by51dcpV7FYz8hBY";

    const userRef = ref(database, `/${personalID}`);
    get(userRef)
      .then((data) => {
        const mydata = data.val();
        console.log(mydata)
        setFiredata(mydata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function for handling form CHANGES
  const handleInputChange = (event) => {
    // console.log(event.target.value);
    setFormInput(event.target.value);
  };

  // Function for handling form SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    // create a reference to our database
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // push the value of the `userInput` state to the database
    const uniqueInput = {
      // place all input for firebase here
    };

    push(dbRef, uniqueInput);
    setFormInput("");
  };

  return (
    <div className="personalEvent">
      {firedata ? (
        <div className="wrapper">
          <div className="title">
            <div className="img">
              <img
                src={firedata.img}
                alt={`${firedata.title} event`}
              />
            </div>
            <div className="titleBottom">
              <div className="titleText">
                <h2>{firedata.title}</h2>
                <h5>
                  {firedata.start} {firedata.time}
                </h5>
                <p>
                  {firedata.address}, {firedata.city}
                </p>
              </div>
              <div className="rsvp">
                <span className="iconCalendar">
                  <p>15</p>
                  <img src={iconCal} alt="Calendar icon" />
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

            <iframe title="Google maps"
              className="googlemap"
              src={`https://maps.google.com/maps?q=${firedata.latitude}, ${firedata.longitude}&output=embed`}
              loading="lazy"
            ></iframe>
          </div>
          
          <div className="attendees">
            <h2>Attending</h2>
            <div className="guest">
              <span className="avatar">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/sloth_lazybones_sluggard_avatar-1024.png"
                  alt=""
                />
              </span>
              <p>Estaban</p>
            </div>
            <div className="guest">
              <span className="avatar">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-1024.png"
                  alt=""
                />
              </span>
              <p>Willow</p>
            </div>

            <div className="guest">
              <span className="avatar">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/scientist_einstein_avatar_professor-1024.png"
                  alt=""
                />
              </span>
              <p>Albert</p>
            </div>
            <div className="guest">
              <span className="avatar">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/cactus_cacti_avatar_pirate-1024.png"
                  alt=""
                />
              </span>
              <p>Martin</p>
            </div>
          </div>
          <div className="socials">
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              class="twitter-share-button"
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


// display attendees:
  // put attendees in a ul 
  // a form gettng the info
  // a function to display to the page
// change 'like event' input to 'host'
// give 'attendees array' its own state
// .push new name through the form back into unique firebase key
