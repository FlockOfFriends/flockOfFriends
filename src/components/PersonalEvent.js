import { useState, useEffect } from "react";

import {
  getDatabase,
  ref,
  onValue,
  push,
  get,
  remove,
  update,
  child,
} from "firebase/database";

import { useParams } from "react-router-dom";
import firebase from "./firebase";

// importing images
import iconLocation from "../assets/iconLocation.svg";
import iconPeople from "../assets/iconPeople.svg";
import iconTicket from "../assets/iconTicket.svg";
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
  ];
  const [guestName, setGuestName] = useState([]);
  const [guestList, setGuestList] = useState([]);
  const [description, setDescription] = useState("");
  const [firedata, setFiredata] = useState([]);
  // work with this one:
  const [formInput, setFormInput] = useState("");
  const { personalID, guestID } = useParams();

  useEffect(() => {
    const database = getDatabase(firebase);

    // const dbRef = ref(database);
    const userRef = ref(database, `/${personalID}`);
    get(userRef)
      .then((data) => {
        const mydata = data.val();
        setFiredata(mydata);
      })
      .catch((error) => {
        console.log(error);
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
      const emptyArray = [];
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
    const database = getDatabase(firebase);
    // const dbRef = ref(database);
    const newGuestName = {
      guest: guestName,
    };
    const userId1 = personalID;

    console.log(personalID);

    const addAttendee = (newName) => {
      const childRef = ref(database, `/${userId1}/attendees`);
      return push(childRef, newName);
    };
    addAttendee(newGuestName);

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

    setGuestName("");
  };

  // Remove names from the guest list
  const handleRemoveName = (attendee) => {
    const database = getDatabase(firebase);
    const userId2 = personalID;
    const childRef = ref(database, `/${userId2}/attendees`);
    remove(childRef);
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

  // const handleRemoveName = (attendee) => {
  //   onValue(childRef, (response) => {
  //       const emptyArray = [];
  //       const data = response.val();
  //       for (let key in data) {
  //         // pushing the values from the object into our emptryArray
  //         emptyArray.push({ personalID: key, name: data[key] });
  //       }
  //       setGuestList(emptyArray)
  //     });
  //   }

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
                  {convertDate(firedata.dateTime)} /{" "}
                  {convertTime(firedata.dateTime)}
                </h5>
                <p>
                  {firedata.address}, {firedata.city}
                </p>
              </div>
              <div className="calendar">
                <span className="iconCalendar">
                  <p className="getMonth">{getMonth(firedata.dateTime)}</p>
                  <p className="getDay">{getDay(firedata.dateTime)}</p>
                </span>
              </div>
            </div>
          </div>

          <div className="details">
            <h2>Details</h2>
            <div className="subDetails">
              <span>
                <img src={iconPeople} alt="people icon" />
              </span>
              <p>Attending: {guestList.length + 1}</p>
            </div>

            {/* <div className="subDetails">
              <span>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/education-340/100/Tilda_Icons_1ed_timer-1024.png"
                  alt=""
                />
              </span>
              <p>Hosts</p>
            </div> */}

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
              <label htmlFor="describe">Description:</label>
              <p>{description}</p>
              <textarea
                type="text"
                id="describe"
                onChange={handleFormChange}
                value={formInput}
              />
              <button className="addButton" onClick={handleFormSubmit}>
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
            <h2>Attending</h2>
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
              {guestList.map((attendee, index) => {
                return (
                  <li key={attendee.name.guest} className="guestName">
                    <span className="avatar">
                      <img src={avatarArray[index]} alt="avatar icon" />
                    </span>
                    <p>{attendee.name.guest}</p>
                    <button
                      className="removeButton"
                      onClick={() => handleRemoveName(attendee.name.guest)}
                    >
                      {" "}
                      Can't Make It
                    </button>
                  </li>
                );
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

// display attendees:

// put attendees in a ul
// a form gettng the info
// a function to display to the page

// put attendees in a ul✅
// a form to get the info✅
// a function to have info display to the page

// change 'like event' input to 'host'
// give 'attendees array' its own state
// .push new name through the form back into unique firebase key

// <div className="attendees">
//             <h2>Attending</h2>
//             <div className="guest">
// <span className="avatar">
//   <img
//     src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/sloth_lazybones_sluggard_avatar-1024.png"
//     alt=""
//   />
// </span>
//   <p>Estaban</p>
// </div>
// <div className="guest">
//   <span className="avatar">
//     <img
//       src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-1024.png"
//       alt=""
//     />
//   </span>
//               <p>Willow</p>
//             </div>

//             <div className="guest">
//               <span className="avatar">
//                 <img
//                   src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/scientist_einstein_avatar_professor-1024.png"
//                   alt=""
//                 />
//               </span>
//               <p>Albert</p>
//             </div>
//             <div className="guest">
//               <span className="avatar">
//                 <img
//                   src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/cactus_cacti_avatar_pirate-1024.png"
//                   alt=""
//                 />
//               </span>
//               <p>Martin</p>
//             </div>
//           </div>
