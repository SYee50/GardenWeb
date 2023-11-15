import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { supabase } from '../client.js'


const MoreEntryPage = () => {
    // get id from url
    const { id } = useParams();
    // prevent unexpected behavior in routing if there is an error
    const navigate = useNavigate();

    
    const [time, setTime] = useState(null)
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
          setTime(data.created_at);
          setTitle(data.title);
          setDescription(data.description);
          setimgURL(data.imgURL);
        }
      };
  
      fetchPost();
    }, [id, navigate]);
  
    return (
        <div className="Card">
            <p className="content">Posted On: {time}</p>
            <h2 className="title">Entry Title: {title}</h2>
            <p className="content">{description}</p>
            <img className="content" src={imgURL} />
            <Link to={"/edit/" + id}>
                <button style={{display: "block", margin: "0 0 0 auto"}}> Edit </button>
            </Link>
        </div>
      );
}

export default MoreEntryPage