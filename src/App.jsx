import { useEffect, useState } from 'react'
import './App.css'
import timeLogo from './assets/timeLogo.svg'
import { SunIcon, MoonIcon } from './assets/themeIcons'

function App() {
  const [time, settime] = useState(0);
  const [toggle, setToggle] = useState(0);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {

    let id = null;
 
    if(toggle) {
      id = setTimeout(() =>{
        settime((prev) => {
          return prev + 1;
        })
      } ,1000);
    }

      return () => {
        clearTimeout(id);
      }
  }, [toggle, time])

  const handleToggle = () => {
    setToggle((prev) => {
      return !prev;
    })
  }

  const handleReset = () => {
    settime(0);
    setToggle(false);
  }

  let seconds = time % 60
  let minutes = Math.floor(time / 60) % 60
  let hours = Math.floor(time / 3600)

  seconds = seconds.toString().padStart(2, '0')
  minutes = minutes.toString().padStart(2, '0')
  hours = hours.toString().padStart(2, '0')


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.getElementById('root').classList.toggle('light');
  };

  return (
    <>
      <div className="app-logo">
        <img src={timeLogo} alt="Time Logo" className="time-logo" />
        <span>Time Flies</span>
      </div>
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
      <div className="stopwatch-container">
        <div className="stopwatch-time">
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </div>
        <div className="stopwatch-buttons">
          {toggle ? (
            <button className="stopwatch-btn" onClick={handleToggle}>Pause</button>
          ) : (
            <button className="stopwatch-btn" onClick={handleToggle}>Play</button>
          )}
          <button className="stopwatch-btn reset" onClick={handleReset}>Reset</button>
        </div>
      </div>
      <footer className="footer">
        <p>Built with ❤️ by Sanvi <span>•</span> {new Date().getFullYear()}</p>
      </footer>
    </>
  )
}

export default App
