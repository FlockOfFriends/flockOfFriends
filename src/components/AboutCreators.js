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
                    <ul className="projectCreators">
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
                                    <p>A creative at heart with solid leadership and managerial experience in the hospitality industry as a (former) small business owner. Classical training in cabinet making and several years of bespoke furniture design round out a lively and unique work history. As a software & web developer - I'm quick to learn & highly adaptable, with a penchant for forward thinking and novel technologies, such as immersion in developing web 3 technologies. Outside of work you'll find me obsessing over books and honing my backend skills (currently Python) and Ethereum/blockchain coding (Solidity).</p>

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
                                    <p>I’m a Front-End Developer with combined 6+ years of experience working in sales and marketing. My diverse background allowed me to develop strong creative and analytical skills. Being a team player with an eye for detail, I am eager to contribute to my next role and expand my knowledge.  </p>

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
                                    <p>I'm a front-end web developer with a Bachelor of Fine Arts and a background in making animal simulation models for veterinary schools. My education and job experiences have honed my abilities to think critically, analyze complex problems, work efficiently under pressure, and work well independently and with a team.</p>

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
                                    <p>I'm Stephen, a front-end web developer. Coming from the museum and art gallery world, I have an eye for clean design and a knack for producing meaningful experiences. Instead of measuring tape and drywall, I now employ semantic html and easy to follow css + sass to sculpt user-friendly digital spaces. Collaborating in teams, my process is guided by command line, clear communication and Github best practices. I'm driven to problem solve thorny questions and find joy in helping others bring complex technical visions to life with React and vanilla Javascript.</p>

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