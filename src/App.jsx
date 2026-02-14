import './App.css'
import TodoList from './TodoList'
import PomodoroTimer from './PomodoroTimer'
import ImageWidget from './ImageWidget'

function App() {
  return (
    <div className="app">
      <h1>Productivity Dashboard</h1>
      <div className="widgets-container">
        <TodoList />
        <PomodoroTimer />
        <ImageWidget />
      </div>
    </div>
  )
}

export default App
