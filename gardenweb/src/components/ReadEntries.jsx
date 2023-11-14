import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import Entry from "./Entry";

const ReadEntries = () => {
    const [posts, setPosts] = useState([]);

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

    return (
        <div className="ReadPosts">
            {/* map out each row of data to an Entry component */}
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Entry key={post.id} id={post.id} title={post.title} time={post.created_at} description={post.description} imgURL={post.imgURL}/>
                ) : <h3 className="noResults">{'No Entries Yet 😞'}</h3>
            }
        </div>  
    )
}

export default ReadEntries