import Weather from '../components/Weather';

function Home() {
  return (
    <div className="home-container">
      <div className="profile-section">
        <div className="profile-image">
          <img src="/imgs/headshot.jpg" alt="Dino's profile" />
        </div>
        <div className="profile-description">
          <h1>Dino Nozicka</h1>
          <p>Welcome to my portfolio!</p>
          <p>I'm a computer science co-op student at Dalhousie University. Primarily 
            interested in Web Development, full stack development, and machine learning. 
            Regardless of the field, I enjoy learning new practices and applying them to real-world problems.</p>
        </div>
      </div>
      <div className="weather-wrapper">
        <Weather />
      </div>
    </div>
  );
}

export default Home; 