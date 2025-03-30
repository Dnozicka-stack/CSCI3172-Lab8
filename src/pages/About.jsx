import InteractiveList from '../context/InteractiveList';

function About() {
  const skills = [
    {
      title: "Programming Languages",
      content: "Java, Python, C, C++, HTML, CSS, JavaScript, R",
      category: "technical"
    },
    {
      title: "Development Tools",
      content: "React, Node.js, Express.js, SQL, Git, AWS, CI/CD, Azure DevOps",
      category: "technical"
    },
    {
      title: "Communication & Leadership",
      content: "Strong communication skills, Teamwork, Leadership, Conflict Resolution",
      category: "interpersonal"
    },
    {
      title: "Professional Skills",
      content: "Problem Solving, Time Management, Adaptability, Quick Learner",
      category: "interpersonal"
    }
  ];

  return (
    <div className="container mt-4 text-start">
      <h1 className="mb-4">About Me</h1>

      <h4 className="mb-3 section-header">Work Experience</h4>
      <div className="work-experience mb-4">
        <div className="position mb-4">
          <h4 className="position-title">Junior Programmer Analyst Co-op Student</h4>
          <p className="text-muted">Government of Canada, PSCC Division | September – December 2024</p>
          <ul className="list-unstyled ps-3">
            <li>• Ensured web applications functioned as intended through code maintenance and Struts framework upgrades</li>
            <li>• Implemented functionality to web applications with JAVA and HTML</li>
            <li>• Solved tickets through communication with customers and SQL database queries</li>
          </ul>
        </div>

        <div className="position mb-4">
          <h4 className="position-title">Junior Tester Analyst Co-op Student</h4>
          <p className="text-muted">Government of Canada, IRCC Division | January – August 2024</p>
          <ul className="list-unstyled ps-3">
            <li>• Ensured web pages functioned as intended through manual and automated testing of web applications</li>
            <li>• Wrote scripts in Java to automate the testing process</li>
            <li>• Used tools such as Eclipse, Git, Selenium, and Azure DevOps</li>
          </ul>
        </div>
      </div>

      <h4 className="mb-3 section-header">Education</h4>
      <p>I am in my final year of my Bachelor's degree in Computer Science at the Dalhousie University. 
        My expected graduation date is December 2025.</p>

      <h4 className="mb-3 section-header">Relevant Coursework</h4>
      <ul className="list-group mb-4">
        <li className="list-group-item">Software Development</li>
        <li className="list-group-item">Data Structures & Algorithms</li>
        <li className="list-group-item">Operating Systems</li>
        <li className="list-group-item">Network Security</li>
        <li className="list-group-item">Database Systems</li>
        <li className="list-group-item">Web Development</li>
      </ul>

      <div className="row">
        <div className="col-12">
          <InteractiveList 
            items={skills} 
            title="Skills" 
          />
        </div>
      </div>
    </div>
  )
}

export default About 