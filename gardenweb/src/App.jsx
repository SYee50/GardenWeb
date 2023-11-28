import './App.css'
import ReadEntries from './components/ReadEntries'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div>
      {/* search bar and crate button */}
      <div style={{display: 'flex', width: '90%', margin: "20px auto", borderRadius: "15px"}}>
          <div style={{display: 'flex', width: '75%'}}>
            <input style={{width: '75%', marginRight: "10px"}} type="search" placeholder="Search" aria-label="Search" />
            <button style={{width: '15%'}} type="submit">Search</button>
          </div>
          <Link to={'/create'} >
            <button>Create New Journal Entry</button>
          </Link>
      </div>

      <h1 id="home-title" >Journal Entries</h1>
      
      <ReadEntries />
    </div>
  )
}

export default App
