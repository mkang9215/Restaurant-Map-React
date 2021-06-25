import { Card } from "react-bootstrap";

function About() {
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>About Me</Card.Title>
            <Card.Text>
              Hi, I’m Minjung Kang.<br /> 
              Welcome to my Restaurant-Map React App!<br /><br />
              <ul>
                <li>Studying Computer Programming at Seneca College, Toronto</li> 
                <li>Working on web development in ReactJS and AngularJS</li>
                <li>Looking for 2021 Fall Software Developer Co-op</li>
              </ul>
              Email: <a href = "mailto: mkang9215@gmail.com">mkang9215@gmail.com</a><br />
              Github: <a href="https://github.com/mkang9215">https://github.com/mkang9215</a><br />
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
  
  export default About;
  