import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="calculator-footer">
      <div className="footer-content">
        <div className="developer-info">
          <span>Developed with ❤️ by </span>
          <a 
            href="https://in.linkedin.com/in/sultan-belai-65691416a" 
            target="_blank" 
            rel="noopener noreferrer"
            className="developer-link"
          >
            Sultan Belai
          </a>
        </div>
        <div className="footer-links">
          <a 
            href="https://github.com/sultanbelai/calculator" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            View Source
          </a>
          {/* <span className="separator">•</span>
          <a 
            href="https://your-portfolio.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Portfolio
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
