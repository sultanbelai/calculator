import React, { useState, useEffect } from 'react';
import './App.css';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState(() => {
    // Check system preference first, then localStorage
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    // Update document class when theme changes
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <div className="calculator-container">
        <header className="calculator-header">
          <h1>Calculator</h1>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>
        <Calculator />
        <Footer />
      </div>
    </div>
  );
}

export default App;
