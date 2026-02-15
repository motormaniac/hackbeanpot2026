import { useState, useEffect } from 'react'

function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState('work') // 'work' or 'break'
  const [firstUse, setFirstUse] = useState(true)

  // loading and saving state with chrome.storage
  useEffect(() => {
    chrome.storage.local.get(['pomodoroState'], (result) => {
      if (result.pomodoroState) {
        const { time, isActive, mode } = result.pomodoroState
        setTime(time)
        setIsActive(isActive)
        setMode(mode)
      }
    })
  }, [])

  useEffect(() => {
    if (firstUse) {
      setFirstUse(false)
    } else {
      chrome.storage.local.set({ pomodoroState: { time, isActive, mode } })
    }
  }, [time, isActive, mode])

  // timer functionality
  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        if (time <= 0) {
            switchMode()
            setIsActive(false)
          }
          return setTime(time => time - 1)
        }, 1000);
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, time, mode])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(mode === 'work' ? 25 * 60 : 5 * 60)
  }

  const switchMode = () => {
    setIsActive(false)
    if (mode === 'work') {
      setMode('break')
      setTime(5 * 60)
    } else {
      setMode('work')
      setTime(25 * 60)
    }
  }

  const getMinutes = () => Math.floor(time / 60)
  const getSeconds = () => time % 60

  return (
    <div className="widget pomodoro-widget">
      <h2> Pomodoro Timer</h2>
      <div className="mode-indicator">
        {mode === 'work' ? 'Work Time' : 'Break Time'}
      </div>
      <div className="timer-display">
        {String(getMinutes()).padStart(2, '0')}:{String(getSeconds()).padStart(2, '0')}
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
