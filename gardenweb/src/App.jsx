import './App.css'
import ReadEntries from './components/ReadEntries'

function App() {
  return (
    <div>
      {/* search bar */}
      {/* create new journal entry button */}
      <h1 id="home-title" >Journal Entries</h1>
      <ReadEntries />
    </div>
  )
}

export default App
