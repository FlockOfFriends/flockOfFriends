import { Link } from "react-router-dom";
import BrianMockup from "../images/BrianMockup";

const  AboutCreators = () => {
    return (
        <div className="aboutCreators">
            <div className="wrapper">
                <div className="aboutCreatorsHeading">
                    <h1>About Creators</h1>
                </div>

                <div> 
                    <ul>
                        <li className="brian">
                            <div className="brianContainer">
                                <div className="brianImgContainer">
                                    <img src={BrianMockup} alt="Mockup of Brian's portfolio wesbsite" />
                                </div>
                                <h3>Brian Charles O'Reilly</h3>
                                <div className="brianContact">
                                    <Link href="https://www.briancharlesoreilly.com/" aria-label="Portfolio Link"></Link>
                                    <FontAwesomeIcon icon="fas fa-browser" />
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, numquam hic magnam facere facilis perferendis asperiores explicabo. Aut repellendus quidem tenetur unde error pariatur debitis adipisci quam! Omnis, quisquam corrupti?</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        
        


        
        </div>
    )
}

export default AboutCreators