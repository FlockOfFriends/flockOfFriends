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
                <h5>{firedata.start} {firedata.time}</h5>
                <p>{firedata.address}, {firedata.city}</p>
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
              <p>{firedata.venue}</p>
            </div>

            <div className="subDetails">
              <span>
                <img src={iconTicket} alt="tickets icon" />
              </span>
              <p>Tickets <a href={`${firedata.tickets}`}>here</a></p>
              
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
  
            {/* <iframe className="googlemap" src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.232150037236!2d${firedata.longitude}!3d${firedata.latitude}`}  loading="lazy" ></iframe> */}

        <iframe className="googlemap" src={`https://maps.google.com/maps?q=${firedata.latitude}, ${firedata.longitude}&output=embed`}  loading="lazy" ></iframe>
        

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
