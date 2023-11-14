import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from '../client.js'


const EditEntryPage = () => {
    // get id from url
    const { id } = useParams();
    // prevent unexpected behavior in routing if there is an error
    const navigate = useNavigate();
  
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null);
    const [imgURL, setimgURL] = useState(null);
  
    useEffect(() => {
      // get current data for id
      const fetchPost = async () => {
        const { data, error } = await supabase.from("Entries").select().eq("id", id).single();
        
        if (error) {
          navigate("/", { replace: true });
        }
        if (data) {
          console.log("data: ", data);
          setTitle(data.title);
          setDescription(data.description);
          setimgURL(data.imgURL);
        }
      };
  
      fetchPost();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // update row with new inputs
        const { data, error } = await supabase
          .from("Entries")
          .update({ title, description, imgURL })
          .eq("id", id);
        
        if (error) {
            console.log(error);
        }
        
        // redirect to homepage after user clicks on button
        window.location = "/";
    };
  
    return (
        <div>
            <h1 className="post-grid">Edit Story Page</h1>
            {/* onChange update state variables */}
            {/* onSubmit update row in database with new values */}
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                id="description"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <input
                type="text"
                id="imgURL"
                placeholder="Image URL (Optional)"
                value={imgURL}
                onChange={(e) => setimgURL(e.target.value)}
                />

                <button className="update-button">Update Journal Entry</button>
            </form>
        </div>
    )
}

export default EditEntryPage