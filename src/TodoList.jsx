import { useEffect, useState } from 'react'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [firstUse, setFirstUse] = useState(true)

  const createTodo = (text) => {
    return { id: Date.now(), text, completed: false }
  }

  useEffect(() => {
    // Load todos from storage on component mount
    chrome.storage.local.get(['todos'], (result) => {
      if (result.todos) {
        setTodos(result.todos)
      }
    })
  }, [])

  useEffect(() => {
    if (firstUse) {
      setFirstUse(false)
    } else {
      chrome.storage.local.set({ todos })
      console.log("Saved: " + todos.length)
    }
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, createTodo(inputValue)])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="widget todo-widget">
      <h2> Todo List</h2>
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
