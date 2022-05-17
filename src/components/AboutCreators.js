import BrianMockup from "../images/BrianMockup.png";
import BeatrizMockup from "../images/BeatrizMockup.png";
import MarliesMockup from "../images/MarliesMockup.png";
import StephenMockup from "../images/StephenMockup.png";
import iconTwitter from "../assets/iconTwitter.png";
import iconLink from "../assets/iconLink.png";
import iconGithub from "../assets/iconGithub.png";



const  AboutCreators = () => {
    return (
        <div className="aboutCreators">

            <div className="aboutCreatorsHeading">
                <h1>About Creators</h1>
            </div>
            
            <div className="wrapper">

                <div> 
                    <h2>Meet our awesome team</h2>
                    <ul>
                        <li className="brian">
                            <div className="creatorContainer">
                                <div className="mockupContainer">
                                    <a target="_blank" href="https://www.briancharlesoreilly.com/"> 
                                        <img src={BrianMockup} alt="Mockup of Brian's portfolio website" />
                                        <span class="sr-only">Link to Brian's Portfolio</span>
                                    </a>
                                </div>
                                <div className="creatorInfo">
                                    <h3>Brian Charles O'Reilly</h3>
                                    <div className="socialIcons">                                    {/* <FontAwesomeIcon icon="fas fa-browser" /> */}
                                        <a href="https://www.linkedin.com/in/brian-charles-oreilly/">
                                            <img src={iconLink} alt="Linkedin icon" />
                                            <span class="sr-only">Link to Brian's Linkedin profile</span>
                                        </a>

                                        <a href="https://github.com/briancharlesoreilly">
                                            <img src={iconGithub} alt="Github icon" />
                                            <span class="sr-only">Link to Brian's Github profile</span>
                                        </a>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, numquam hic magnam facere facilis perferendis asperiores explicabo. Aut repellendus quidem tenetur unde error pariatur debitis adipisci quam! Omnis, quisquam corrupti?</p>
                                </div>
                            </div>
                        </li>

                        <li className="beatriz">
                            <div className="creatorContainer">
                                <div className="mockupContainer">
                                    <a href="https://www.beaferreira.ca/">
                                        <img src={BeatrizMockup} alt="Mockup of Beatriz portfolio website" />
                                        <span class="sr-only">Link to Bea's Portfolio</span>
                                    </a>
                                </div>
                                <div className="creatorInfo">
                                    <h3>Beatriz Ferreira</h3>
                                    <div className="socialIcons">
                                        <a href="https://www.linkedin.com/in/beatrizfb/" >
                                            <img src={iconLink} alt="Linkedin icon" />
                                            <span class="sr-only">Link to Bea's Linkedin profile</span>
                                        </a>
                                        <a href="https://github.com/becarolf" >
                                            <img src={iconGithub} alt="Github icon" />
                                            <span class="sr-only">Link to Bea's Github profile</span>
                                        </a>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, numquam hic magnam facere facilis perferendis asperiores explicabo. Aut repellendus quidem tenetur unde error pariatur debitis adipisci quam! Omnis, quisquam corrupti?</p>
                                </div>
                            </div>
                        </li>

                        <li className="marlies">
                            <div className="creatorContainer">
                                <div className="mockupContainer">
                                    <a href="https://www.marliesclaire.com/" >
                                    <img src={MarliesMockup} alt="Mockup of Marlies' portfolio website" />
                                    <span class="sr-only">Link to Marlies Portfolio</span>
                                    </a>
                                </div>
                                <div className="creatorInfo">
                                    <h3>Marlies Zimmer</h3>
                                    <div className="socialIcons">
                                        <a href="https://www.linkedin.com/in/marlies-zimmer/" >
                                            <img src={iconLink} alt="Linkedin icon" />
                                            <span class="sr-only">Link to Marlies' Linkedin profile</span>
                                        </a>
                                        <a href="https://github.com/mzmarlies" >
                                            <img src={iconGithub} alt="Github icon" />
                                            <span class="sr-only">Link to Marlies Github profile</span>
                                        </a>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, numquam hic magnam facere facilis perferendis asperiores explicabo. Aut repellendus quidem tenetur unde error pariatur debitis adipisci quam! Omnis, quisquam corrupti?</p>
                                </div>
                            </div>
                        </li>

                        <li className="stephen">
                            <div className="creatorContainer">
                                <div className="mockupContainer">
                                    <a href="https://www.skorzenstein.com/" >
                                        <img src={StephenMockup} alt="Mockup of Stephen's portfolio website" />
                                        <span class="sr-only">Link to Stephen's Portfolio</span>
                                    </a>
                                </div>
                                <div className="creatorInfo">
                                    <h3>Stephen Korzenstein</h3>
                                    <div className="socialIcons">
                                        <a href="https://www.linkedin.com/in/skorzenstein/" aria-label="Linkedin Link">
                                            <img src={iconLink} alt="Linkedin icon" />
                                            <span class="sr-only">Link to Stephen's Linkedin profile</span>
                                        </a>
                                        <a href="https://github.com/korzenstein" aria-label="Github Link">
                                            <img src={iconGithub} alt="Github icon" />
                                            <span class="sr-only">Link to Stephen's Github profile</span>
                                        </a>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, numquam hic magnam facere facilis perferendis asperiores explicabo. Aut repellendus quidem tenetur unde error pariatur debitis adipisci quam! Omnis, quisquam corrupti?</p>
                                </div>
                                
                            </div>
                        </li>
                    </ul>
                </div>
            
            </div>
        </div>
    )
}

export default AboutCreators