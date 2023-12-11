import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import { Link } from "react-router-dom"
import Entry from "./Entry";

const ReadEntries = (props) => {
    const [entries, setEntries] = useState([]);

    // confirm search input is passed to component
    console.log(props.search)

    useEffect(() => {
      // READ all rows from Entries table
      const fetchEntries = async () => {
        const {data} = await supabase
        .from('Entries')
        .select()
        .order('created_at', { ascending: true })
        
        // set state variable to data
        setEntries(data)
      }

      fetchEntries()
    }, []);

    // indicate if the search input is present in a journal entry's title
    const matchSearchInput = (entry) => {
      return entry.title.toLowerCase().includes(props.search.toLowerCase())
    }

    return (
        <div id='entries-list'>
            {/* map out each row of data to an Entry component */}
            {/* filter entries by title when user types in search bar */}
            {
              entries && entries.length > 0 ?
                entries
                  .filter(matchSearchInput)
                  .map((entry) =>
                    <Link to={"/more/" + entry.id}>
                      <Entry key={entry.id} 
                             id={entry.id} 
                             title={entry.title} 
                             time={entry.created_at} 
                             description={entry.description} 
                             imgURL={entry.imgURL}/>
                    </Link>
                  ) : <h1></h1>
            }
        </div>  
    )
}

export default ReadEntries