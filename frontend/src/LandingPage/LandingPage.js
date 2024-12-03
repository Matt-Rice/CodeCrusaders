import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">WellMind</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                >
                  MacroMonitor
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  aria-expanded="false"
                >
                  DailyDose
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About Us</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Help
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">FAQs</a></li>
                  <li><a className="dropdown-item" href="#">User Guide</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Report a Bug</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../public/design_artifacts/design_artifacts.html">Design Artifacts</a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Header */}
      <div className="text-center">
        <h1>WellMind</h1>
        <h2>Stay On Track, Stay Well</h2>
      </div>
      <hr />

      {/* Accordion */}
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Description
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
                <p>
                    WellMind is a health and wellness application designed to make your life simpler when it comes to 
                    meeting your medical, nutritional, and general wellness goals. 
                    <br/>WellMind will include a wealth of different features to make reaching your personal health goals more obtainable. 
                    <br/>Some of these features include but are not limited to:
                </p>
                <ul>
                    <li>MacroMonitor, a calorie and nutrient tracker where you can input what you eat and track your calories and nutrients, and set goals and limits to help you 
                    plan meals in advance to stay in line with your personal health goals. </li>
        
                    <li>DailyDose, a medicine reminder and tracker that allows you or one of your loved ones to set up reminders for when and what medicine 
                    you or them need to take along with allowing you or them to input details about the medicine to 
                    help make the process easier for everyone.</li>
                </ul>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Who We Are
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div>
                    <img src="img/truong.jpg" alt="truongLe"/>
                        <h3>Truong Le</h3>
                        <p>Hello, my name is Truong Le. I am a senior at Bellarmine University and a member the WellMind Project. I am born and raised in Kentucky. 
                            I have experience in both java and python.
                        </p>
                        <br/><hr/>
                        <img src="img/hayden.jpg" alt="haydenManton" height="192px"/>
                        <h3>Hayden Manton</h3>
                        <p>Hello, my name is Hayden Manton. I am an exchange student from Manchester, England, studying Computer Science and AI. I have experience 
                            in Python, Java, Visual Basic, HTML, CSS, and JavaScript. I am currently a Junior and a member of the team developing the WellMind health app.
                        </p>

                        <br/><hr/>
                        <img src="img/ben.jpg" alt="benPowell" width="194px" height="192px"/>
                        <h3>Benjamin Powell</h3>
                        <p>Hello, my name is Benjamin Powell. I am a member of our WellMind Project. I am a Kentuckian born and raised near Louisville in Crestwood, 
                            Kentucky. I am currently a senior at Bellarmine University.
                        </p>

                        <br/><hr/>

                        <img src="img/matt.jpg" alt="mattRice" width="194px" height="192px"/>
                        <h3>Matthew Rice</h3>
                        <ul>
                            <li>Louisville, KY born and raised.</li>
                            <li>Computer science major with math and Spanish minors at Bellarmine University.</li>
                            <li>Full Stack Development Intern at UPS.</li>
                            <li>Currently researching path-planning algorithms for autonomous underwater vehicles (AUVs).</li>
                        </ul>
                        <hr/>
                </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="img/PeopleLaughing.jpg" className="card-img-top" alt="General public laughing" />
              <div className="card-body text-center">
                <h5 className="card-title">Who is WellMind made for?</h5>
                <p className="card-text">
                    It was made with the public in mind.
                    Especially, people who are trying to watch what they eat and people 
                    who have trouble remembering to do things such as:
                </p>
                <ul>
                    <li>Taking medicine at a certain time.</li> 
                    <li>Going to the gym.</li>
                    <li>Meetings</li>
                    <li>Doctor appointments</li>
                </ul>
                <a href="#Description" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <img src="img/Heart.jpg" className="card-img-top" alt="Heart" />
              <div className="card-body text-center">
                <h5 className="card-title">Our Vision</h5>
                <ul>
                    <li> We hope that WellMind will become an application that allow for users to live a happier and healthy life 
                        by helping them to reach their health and finess goals by logging their meals and keeping track of their nutrient intake.</li>

                    <li>We hope that it can help users keep their schedules on track by allowing them to set reminders for general tasks.</li>

                    <li>We hope that it can allow users who take medicine, keep track of when and how much medicine to take, and 
                        other information regarding a user's pills.</li>
                </ul>
                <a href="#whoWeAre" className="btn btn-primary">Who We Are</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5"></div>
        <div className="row">
            
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body text-center">
                      <i className="bi bi-geo-alt-fill text-info" style={{ fontSize: "2rem" }}></i>
                        <h5 className="card-title mt-3" style={{color:"rgb(38, 14, 215)"}}>MacroMonitor</h5>
                        <p className="card-text">
                            MacroMonitor is your all stop shop for logging your meals and keeping track of your nutrient goals.
                            Click the button below or in the top navbar to navigate to the MacroMonitor.
                        </p>
                        <br/><br/><br/><br/>
                        <a href="#" className="btn btn-primary">MacroMonitor</a>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card">
                    <div className="card-body text-center">
                        <i className="bi bi-heart-fill text-danger" style={{ fontSize: "2rem" }}></i>
                        <h5 className="card-title mt-3" style={{color : "rgb(38, 14, 215)"}}>DailyDose</h5>
                        <p className="card-text">DailyDose is a medicine and event tracker and reminder that 
                            allows you to input medicines and information about those medicines and it will send you 
                            a reminder to take that medicine at that given time and check off that you took that medicine.<br/>
                            It can also be used as a reminder for general events such as a meeting or doctor appointments to
                            help keep you on track and make sure you never miss a beat.</p>
                    
                            <a href="#" className="btn btn-primary">DailyDose</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
      {/* Embedded Video */}
      <div className="container text-center mt-5">
        <h3>Pitch</h3>
        <iframe
          id="kaltura_player"
          src="https://cdnapisec.kaltura.com/p/2619912/embedPlaykitJs/uiconf_id/53657692?iframeembed=true&amp;entry_id=1_m5xi0m8e&amp;config%5Bprovider%5D=%7B%22widgetId%22%3A%221_3krl7io4%22%7D&amp;config%5Bplayback%5D=%7B%22startTime%22%3A0%7D"
          style={{ width: "400px", height: "285px", border: "0" }}
          allowFullScreen
          title="WellMind Project Pitch"
        ></iframe>
      </div>
    </div>
  );
};

export default LandingPage;
