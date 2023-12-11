import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../client.js'


const CreateEntryPage = () => {
    // state variable to hold user input data (must be "" to use .substring())
    const [entry, setEntry] = useState({title: "", description: "", imgURL: ""})
    const navigate = useNavigate();

    // update entry state variable with form inputs
    const handleChange = (event) => {
        const {name, value} = event.target;
        setEntry( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    // insert entry  data to supabase database
    const createEntry = async (event) => {
        event.preventDefault();

        const { error } = await supabase
        .from('Entries')
        .insert({title: entry.title, description: entry.description, imgURL: entry.imgURL})
        .select()

        console.log("inserted to entries")

        if (error) {
            console.log(error);
        }
        
        // route to this homepage after submit
        navigate('/')

    }

    return (
        <div>
            <h1 className="other-header">Create New Journal Entry</h1>

            <form onSubmit={createEntry}>
                <label>Title</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value ={entry.title} 
                    onChange={handleChange}
                    required/>

                <label >Description</label>
                <textarea 
                    name="description" 
                    rows="5" 
                    cols="50" 
                    id="description" 
                    value ={entry.description} 
                    onChange={handleChange}
                    required
                    >
                </textarea>

                <label >Image URL (optional)</label>
                <input 
                    type="text" 
                    id="imgURL" 
                    name="imgURL" 
                    value ={entry.imgURL} 
                    onChange={handleChange}/>

                <button className="form-button">Create New Journal Entry</button>
            </form>
        </div>
    )
}

export default CreateEntryPage