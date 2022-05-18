import { useState, useEffect } from "react";

import {
  getDatabase,
  ref,
  onValue,
  push,
  get,
  remove,
  update,
} from "firebase/database";

import { useParams } from "react-router-dom";
import firebase from "./firebase";

// importing images
import iconFB from "../assets/iconFB.png";
import iconTwitter from "../assets/iconTwitter.png";
import iconWhats from "../assets/iconWhats.png";
import iconLink from "../assets/iconLink.png";
import iconLocation from "../assets/iconLocation.svg";
import iconPeople from "../assets/iconPeople.svg";
import iconTicket from "../assets/iconTicket.svg";
import iconCopy from "../assets/iconCopy.png";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import avatar4 from "../assets/avatar4.png";
import avatar5 from "../assets/avatar5.png";
import avatar6 from "../assets/avatar6.png";
import avatar7 from "../assets/avatar7.png";
import avatar8 from "../assets/avatar8.png";
import avatar9 from "../assets/avatar9.png";
import avatar10 from "../assets/avatar10.png";
import avatar11 from "../assets/avatar11.png";
import avatarHost from "../assets/avatarHost.png";

const PersonalEvent = ({ liked }) => {
  const avatarArray = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
  ];
  const [guestName, setGuestName] = useState([]);
  const [guestList, setGuestList] = useState([]);
  const [description, setDescription] = useState("");
  const [firedata, setFiredata] = useState([]);
  // work with this one:
  const [formInput, setFormInput] = useState("");
  const { personalID } = useParams();

  useEffect(() => {
    const database = getDatabase(firebase);
    const userRef = ref(database, `/${personalID}`);
    get(userRef)
      .then((data) => {
        const mydata = data.val();

        setFiredata(mydata);
      })
      .catch((error) => {
      });

    // Calling the db for existing guests right away
    const userId2 = personalID;
    const childRef = ref(database, `/${userId2}/attendees`);

    onValue(childRef, (response) => {
      const emptyArray = [];
      const data = response.val();
      for (let key in data) {
        // pushing the values from the object into our emptryArray
        emptyArray.push({ personalID: key, name: data[key] });
      }
      setGuestList(emptyArray);
    });

    // Calling the description right away

    // const userId2 = personalID;
    const childRef2 = ref(database, `/${personalID}/description`);
    onValue(childRef2, (response) => {
      // const emptyArray = [];
      const data = response.val();
      setDescription(data);
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

  // Function for handling form CHANGES of the guest list
  const handleInputChange = (event) => {
    setGuestName(event.target.value);
  };

  // Function for handling form SUBMIT of the guest list

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!guestName) {
      alert("Please add your name");
    } else {
      const database = getDatabase(firebase);
      const newGuestName = {
        guest: guestName,
      };

      const childRef = ref(database, `/${personalID}/attendees`);

      const addAttendee = (newName) => {
        return push(childRef, newName);
      };
      addAttendee(newGuestName);

      onValue(childRef, (response) => {
        const emptyArray = [];
        const data = response.val();
        for (let key in data) {
          // pushing the values from the object into our emptryArray
          emptyArray.push({ personalID: key, name: data[key] });
        }
        setGuestList(emptyArray);
      });
    }

    setGuestName("");
  };

  // Remove names from the guest list
  const handleRemoveName = (attendee) => {
    // accessing firebase data and creating a reference to the attendee's unique ID in order to remove them from the guest list one at a time:
    const database = getDatabase(firebase);
    const childRef = ref(database, `/${personalID}/attendees/${attendee}`);
    remove(childRef);

    // creating a reference to the updated guestlist (after name removal):
    const guestListRef = ref(database, `/${personalID}/attendees`);

    // updating guestlist display:
    onValue(guestListRef, (response) => {
      const emptyArray = [];
      const data = response.val();
      for (let key in data) {
        // pushing the values from the object into our emptryArray
        emptyArray.push({ personalID: key, name: data[key] });
      }
      setGuestList(emptyArray);
    });
  };

  const handleFormChange = (event) => {
    setFormInput(event.target.value);
  };
  // Function for handling description submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const newUserSettings = {
      description: formInput,
    };

    const userId = personalID;

    const changeSetting = (settingChange) => {
      const childRef = ref(database, `/${userId}`);
      return update(childRef, settingChange);
    };

    changeSetting(newUserSettings);
    setFormInput("");
  };

  return (
    <>
      <h2>Your Event</h2>
      <div className="personalEvent">
        {firedata ? (
          <div className="wrapper">
            <div className="title">
              <div className="img">
                <img src={firedata.img} alt={`${firedata.title} event`} />
              </div>
              <div className="titleBottom">
                <div className="titleText">
                  <h3>{firedata.title}</h3>
                  <h4>
                    {convertDate(firedata.dateTime)} /{" "}
                    {convertTime(firedata.dateTime)}
                  </h4>
                  <p>
                    {firedata.address}, {firedata.city}
                  </p>
                </div>
                <div className="calendar">
                  <span className="iconCalendar">
                    {firedata.dateTime ? (
                      <p className="getMonth">{getMonth(firedata.dateTime)} </p>
                    ) : null}

                    {firedata.dateTime ? (
                      <p className="getDay">{getDay(firedata.dateTime)}</p>
                    ) : null}
                  </span>
                </div>
              </div>
            </div>

            <div className="details">
              <h3>Details</h3>
              <div className="subDetails">
                <span>
                  <img src={iconPeople} alt="people icon" />
                </span>
                {guestList.length === undefined ? null : (
                  <p>Attending: {guestList.length + 1}</p>
                )}
              </div>

              <div className="subDetails">
                <span>
                  <img src={iconLocation} alt="location icon" />
                </span>
                <p>{firedata.venue}</p>
              </div>

              <div className="subDetails bottom">
                <span>
                  <img src={iconTicket} alt="tickets icon" />
                </span>
                <p>
                  Tickets <a href={`${firedata.tickets}`}>here</a>
                </p>
              </div>

              <div className="description">
                <form action="submit" className="describeForm">
                  <label htmlFor="describe">
                    Write a description for your event:
                  </label>
                  <p>{description}</p>
                  <textarea
                    type="text"
                    id="describe"
                    onChange={handleFormChange}
                    value={formInput}
                  />
                  <button className="detailsButton" onClick={handleFormSubmit}>
                    Change Details
                  </button>
                </form>
              </div>
            </div>
            <div className="map">
              <iframe
                title="Google maps"
                className="googlemap"
                src={`https://maps.google.com/maps?q=${firedata.latitude}, ${firedata.longitude}&output=embed`}
              ></iframe>
            </div>

            <div className="attendees">
              <h3>Attending</h3>
              <ul className="guest">
                <li className="guestName">
                  <form className="addGuest" action="submit">
                    <label htmlFor="attendeeName">
                      Put Yourself on the Guest List:
                    </label>
                    <input
                      id="attendeeName"
                      type="text"
                      onChange={handleInputChange}
                      value={guestName}
                    />
                    <button className="addButton" onClick={handleSubmit}>
                      Add Name
                    </button>
                  </form>
                </li>
              </ul>
              <ul className="addedNames">
                <li className="guestName">
                  <span className="avatar">
                    <img src={avatarHost} alt="avatar icon" />
                  </span>
                  <p>Hosted by: {firedata.userInput}</p>
                </li>
                {guestList.map((guestName, index) => {
                  return (
                    <li key={guestName.name.guest} className="guestName">
                      <span className="avatar">
                        <img src={avatarArray[index]} alt="avatar icon" />
                      </span>
                      <p>{guestName.name.guest}</p>
                      <button
                        className="removeButton"
                        onClick={() => handleRemoveName(guestName.personalID)}
                      >
                        {" "}
                        Can't Make It
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Social media share links - change url once netlify name is chosen */}
            <div className="socials">
              <h3>Share Event</h3>
              <ul>
                <li>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://flockevents.netlify.app/personal/${personalID}`}
                  >
                    <img
                      src={iconFB}
                      alt="Facebook Icon"
                      className="socialIcons"
                      aria-hidden="true"
                    />
                    <span className="sr-only">
                      Link to Share Event on Facebook
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={`https://api.whatsapp.com/send?text=https://flockevents.netlify.app/personal/${personalID}`}
                    data-action="share/whatsapp/share"
                  >
                    <img
                      src={iconWhats}
                      alt="WhatsApp Icon"
                      className="socialIcons"
                      aria-hidden="true"
                    />
                    <span className="sr-only">
                      Link to Share Event on WhatsApp 
                    </span>
                  </a>
                </li>

                

                <li>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://flockevents.netlify.app/personal/${personalID}`}
                  >
                    <img
                      src={iconLink}
                      alt="LinkedIn Icon"
                      className="socialIcons"
                      aria-hidden="true"
                    />
                    <span className="sr-only">
                      Link to Share Event on LinkedIn
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://twitter.com/intent/tweet?url=https://flockevents.netlify.app/personal/${personalID}`}
                  >
                    <img
                      src={iconTwitter}
                      alt="Twitter Icon"
                      className="socialIcons"
                      aria-hidden="true"
                    />
                    <span className="sr-only">
                      Link to Share Event on Twitter
                    </span>
                  </a>
                </li>
                <li>
                  <button className="socialIcons copy"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://flockevents.netlify.app/personal/${personalID}`
                      )
                    }
                  >
                    <img
                    title="Copy Event Link to Clipboard"
                      src={iconCopy}
                      alt="Copy Link Icon"
                      className="socialIcons"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Copy Event Link to Clipboard</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PersonalEvent;
