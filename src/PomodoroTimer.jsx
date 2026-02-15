import { useState, useEffect } from 'react'

function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState('work') // 'work' or 'break'

  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished
            setIsActive(false)
            if (mode === 'work') {
              setMode('break')
              setMinutes(5)
            } else {
              setMode('work')
              setMinutes(25)
            }
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, minutes, seconds, mode])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMode('work')
    setMinutes(25)
    setSeconds(0)
  }

  const switchMode = () => {
    setIsActive(false)
    if (mode === 'work') {
      setMode('break')
      setMinutes(5)
    } else {
      setMode('work')
      setMinutes(25)
    }
    setSeconds(0)
  }

  return (
    <div className="widget pomodoro-widget">
      <h2> Pomodoro Timer</h2>
      <div className="mode-indicator">
        {mode === 'work' ? 'Work Time' : 'Break Time'}
      </div>
      <div className="timer-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="timer-controls">
        <button onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={switchMode}>
          Switch to {mode === 'work' ? 'Break' : 'Work'}
        </button>
      </div>
    </div>
  )
}

export default PomodoroTimer
