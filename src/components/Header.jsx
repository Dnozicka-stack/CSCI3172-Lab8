import { Link } from 'react-router-dom'
import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header role="banner">
      <nav role="navigation" aria-label="Main navigation">
        <button 
          className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
        <ul className={`nav-list ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenu} aria-label="Home page">Home</Link></li>
          <li><Link to="/about" onClick={closeMenu} aria-label="About page">About</Link></li>
          <li><Link to="/resume" onClick={closeMenu} aria-label="Resume page">Resume</Link></li>
          <li><Link to="/projects" onClick={closeMenu} aria-label="Projects page">Projects</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header 