import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, get } from "firebase/database";
import { useParams } from "react-router-dom";
import firebase from "./firebase";

// importing images
import iconClock from "../assets/iconClock.svg";
import iconLocation from "../assets/iconLocation.svg";
import iconPeople from "../assets/iconPeople.svg";
import iconTicket from "../assets/iconTicket.svg";

const PersonalEvent = ({ liked }) => {
  const [firedata, setFiredata] = useState([]);
  const { personalID } = useParams();
  console.log("hello", personalID);

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const userID = "-N1_by51dcpV7FYz8hBY";

    const userRef = ref(database, `/${personalID}`);
    get(userRef)
      .then((data) => {
        const mydata = data.val();
        setFiredata(mydata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="personalEvent">
      {firedata ? (
        <div className="wrapper">
          <div className="title">
            <div className="img">
              <img src={firedata.img} alt="" />
            </div>
            <div className="titleBottom">
              <div className="titleText">
                <h2>{firedata.title}</h2>
                <h5>FRIDAY, SEPTEMBER 9, 2022 AT 6 PM – 12 AM</h5>
                <p>Hamilton, Ontario</p>
              </div>
              <div className="rsvp">
                <button className="rsvpButton" type="button">RSVP</button>
                <button className="rsvpButton" type="button">INTEREST</button>
              </div>
            </div>
          </div>

          <div className="details">
            <h2>Details</h2>
            <div className="subDetails">
              <span>
                <img src={iconPeople} alt="" />
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
              <p>Location</p>
            </div>

            <div className="subDetails">
              <span>
                <img src={iconTicket} alt="tickets icon" />
              </span>
              <p>Tickets</p>
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
              className="openmap"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-79.38913822174072%2C43.64935160150104%2C-79.37454700469972%2C43.65933417670887&amp;layer=mapnik"
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
        </div>
      ) : null}
    </div>
  );
};

export default PersonalEvent;
