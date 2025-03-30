import { useState, useEffect } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/.netlify/functions/getProjects');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return (
    <div className="container mt-4 text-start">
      <h1 className="mb-4">My Projects</h1>
      <div className="work-experience mb-4">
        <p>Loading projects...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mt-4 text-start">
      <h1 className="mb-4">My Projects</h1>
      <div className="work-experience mb-4">
        <p className="error-message">{error}</p>
        <p className="help-text">Please try again later.</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-4 text-start">
      <h1 className="mb-4">My Projects</h1>
      
      <div className="work-experience mb-4">
        {projects.map(project => (
          <div key={project.id} className="position mb-4">
            <h4>{project.name}</h4>
            <p className="text-muted">
              {project.languages.join(', ')} | {project.organization} | {project.period}
            </p>
            <p className="mb-3">{project.description}</p>
            <ul className="list-unstyled ps-3">
              {project.achievements.map((achievement, index) => (
                <li key={index}>• {achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects; 