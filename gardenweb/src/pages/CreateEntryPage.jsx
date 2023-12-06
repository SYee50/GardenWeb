import { useState } from "react";
import { supabase } from '../client.js'

const CreateEntryPage = () => {
    // state variable to hold user input data (must be "" to use .substring())
    const [post, setPost] = useState({title: "", description: "", imgURL: ""})

    // update post state variable with form inputs
    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    // insert entry post data to supabase database
    const createPost = async (event) => {
        event.preventDefault();

        const { error } = await supabase
        .from('Entries')
        .insert({title: post.title, description: post.description, imgURL: post.imgURL})
        .select()

        console.log("inserted to entries")

        if (error) {
            console.log(error);
        }
        
        // route to this homepage after submit
        window.location = "/";

    }

    return (
        <div>
            <h1 className="post-grid">Create New Journal Entry</h1>
            <form onSubmit={createPost}>
                <label>Title</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value ={post.title} 
                    onChange={handleChange}
                    required/>

                <label >Description</label>
                <textarea 
                    name="description" 
                    rows="5" 
                    cols="50" 
                    id="description" 
                    value ={post.description} 
                    onChange={handleChange}
                    required
                    >
                </textarea>

                <label >Image URL (optional)</label><br />
                <input 
                    type="text" 
                    id="imgURL" 
                    name="imgURL" 
                    value ={post.imgURL} 
                    onChange={handleChange}/>

                <input type="submit" value="Create New Journal Entry" />
            </form>
        </div>
    )
}

export default CreateEntryPage