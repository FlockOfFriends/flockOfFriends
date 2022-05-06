import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

const EventDetails = () => {

    const {eventID} = useParams()
    const [detailsArray, setDetailsArray] = useState({})


    useEffect(()=> {
    const configDetails = {
      method: "get",
      url: `https://app.ticketmaster.com/discovery/v2/events/${eventID}`,
      params: {
        apikey: "NJCKlZmMAiwCVsFMlf33AlMF11d5iusP",
      },
    };
    axios(configDetails)
      .then(function (response) {
        const results = response.data;
        console.log(results)
        setDetailsArray(results)
      })
      .catch(function (error) {
        console.log(error);
      });
    },[eventID])

    // const { original_title, tagline, overview, poster_path } = movieDetails
    // console.log(movieDetails)

    return (
        <div>
            <div>
                <h2>{detailsArray.name}</h2>
                <h3>Placeholder</h3>
                <p>Placeholder</p>
            </div>
            <div>
                {/* <img 
                src={detailsArray.images[0].url} 
                alt={`Placeholder`} 
                /> */}

            </div>

        </div>
        
    )
}

export default EventDetails