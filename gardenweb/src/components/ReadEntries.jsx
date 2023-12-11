import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import { Link } from "react-router-dom"
import Entry from "./Entry";

const ReadEntries = (props) => {
    const [posts, setPosts] = useState([]);

    // confirm search input is passed to component
    console.log(props.search)

    useEffect(() => {
      // READ all rows from Entries table
      const fetchPosts = async () => {
        const {data} = await supabase
        .from('Entries')
        .select()
        .order('created_at', { ascending: true })
        
        // set state variable to data
        setPosts(data)
      }

      fetchPosts()
    }, []);

    // indicate if the search input is present in a journal entry's title
    const matchSearchInput = (post) => {
      return post.title.toLowerCase().includes(props.search.toLowerCase())
    }

    return (
        <div className="ReadPosts">
            {/* map out each row of data to an Entry component */}
            {/* filter posts by title when user types in search bar */}
            {
              posts && posts.length > 0 ?
                posts
                  .filter(matchSearchInput)
                  .map((post) =>
                    <Link to={"/more/" + post.id}>
                      <Entry key={post.id} 
                             id={post.id} 
                             title={post.title} 
                             time={post.created_at} 
                             description={post.description} 
                             imgURL={post.imgURL}/>
                    </Link>
                  ) : <h3 className="noResults">{'No Entries Yet'}</h3>
            }
        </div>  
    )
}

export default ReadEntries