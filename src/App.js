import { useEffect, useState } from "react";
import  {Routes, Route} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import axios from "axios";

// components
import AllEvents from './components/AllEvents'
import EventDetails from './components/EventDetails'

function App() {
  const [location, setLocation] = useState("Toronto")
  const [toggleApi, setToggleApi] = useState(false)

  // useEffect(()=> {
  //   const configTicket = {
  //     method: "get",
  //     url: `https://app.ticketmaster.com/discovery/v2/events`,
  //     params: {
  //       apikey: "NJCKlZmMAiwCVsFMlf33AlMF11d5iusP",
  //       city: location,
  //     },
  //   };
  //   axios(configTicket)
  //     .then(function (response) {
  //       const results = response.data._embedded.events;
  //       console.log(results)
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [toggleApi])

  const handleSubmit = (event) => {
    event.preventDefault();
    setToggleApi(!toggleApi);
  };


  return (
    <div className="App">
      <header>
        <nav>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                className="search"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
    

            {/* Submit button */}
            <input className="submit" type="submit" />
          </form>
        </nav>
      </header>
      {/* <AllEvents 
      location={location}
      /> */}
     
     <Routes>
        <Route path="/" element={<AllEvents location={location} />} />
        <Route path="/event/:eventID" element={<EventDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
