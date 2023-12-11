import './App.css'
import ReadEntries from './components/ReadEntries'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const [searchInput, setSearchInput] = useState("")

  return (
    <div>

      <h1 id="home-title" >Journal Entries</h1>

      {/* search bar and crate button */}
      <div style={{display: 'flex', width: '70%', margin: "20px auto", borderRadius: "15px"}}>
          <div style={{display: 'flex', width: '75%'}}>
            <input 
              style={{width: '100%', marginRight: "10px", fontSize: "x-large", minWidth: "275px"}} 
              type="search" 
              placeholder=" 🔍 Search" 
              aria-label="Search" 
              
              // get search input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

          </div>
          <Link to={'/create'} >
            <button style={{minWidth: "275px"}} >Create New Journal Entry</button>
          </Link>
      </div>
      
      {/* pass search input to component for post list */}
      <ReadEntries search={searchInput} />
    </div>
  )
}

export default App
