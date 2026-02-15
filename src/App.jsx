import "./App.css";
import TodoList from "./TodoList";
import PomodoroTimer from "./PomodoroTimer";
import ImageWidget from "./ImageWidget";

function App() {
  return (
    <div className="app">
      <img src="./studybuddylogo.png" className="logo" alt="Logo" />

      <div className="widgets-container">
        <TodoList />
        <PomodoroTimer />
        <ImageWidget />
      </div>
    </div>
  );
}

export default App;
