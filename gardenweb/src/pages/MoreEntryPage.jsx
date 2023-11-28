import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { supabase } from '../client.js'


const MoreEntryPage = () => {
    // get id from url
    const { id } = useParams();
    // prevent unexpected behavior in routing if there is an error
    const navigate = useNavigate();

    
    const [time, setTime] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [imgURL, setimgURL] = useState("");
  
    useEffect(() => {
      // get current data for id
      const fetchPost = async () => {
        const { data, error } = await supabase.from("Entries").select().eq("id", id).single();
        
        if (error) {
          navigate("/", { replace: true });
        }
        if (data) {
          console.log("data: ", data);
          setTime(data.created_at);
          setTitle(data.title);
          setDescription(data.description);
          setimgURL(data.imgURL);
        }
      };
  
      fetchPost();
    }, [id, navigate]);

    const deletePost = async (e) => {
      e.preventDefault()

      await supabase
        .from('Entries').delete().eq('id', id)
      
      // redirrect to homepage after post deleted
      window.location = '/'
    }
  
    return (
        <div className="Card">
            <p className="content">Posted On: {time.substring(0,10)}</p>
            <h2 className="title">Entry Title: {title}</h2>
            <p className="content">{description}</p>
            <img className="content" src={imgURL} />
            <div className="button-container" style={{margin: "auto 0 0 0"}}>
              <Link to={"/edit/" + id} >
                  <button> Edit </button>
              </Link>
              <button onClick={deletePost}>Delete</button>
            </div>
        </div>
      );
}

export default MoreEntryPage