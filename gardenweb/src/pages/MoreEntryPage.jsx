import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { supabase } from '../client.js'


const MoreEntryPage = () => {
    // get id from url
    const { id } = useParams();
    // prevent unexpected behavior in routing if there is an error
    const navigate = useNavigate();

    // database state variabes
    const [time, setTime] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [imgURL, setimgURL] = useState("");

    // state variable for pop-up prompt
    const [showPrompt, setShowPrompt] = useState(false)
  
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

    // delete journal entry
    const deletePost = async (e) => {
      e.preventDefault()

      await supabase
        .from('Entries').delete().eq('id', id)
      
      // redirect to homepage after post deleted
      window.location = '/'
    }

    // user clicks on "Delete" in initial page and pop-up appears
    const handleDeleteClick = () => {
      setShowPrompt(true)
    }

    // user clicks "Delete" in prompt and deletion proceeds
    const handlePermanentDelete = (e) => {
      deletePost(e)
      setShowPrompt(false)
    }

    // user clicks "Cancel" and pop-up disappears and nothing else occurs
    const handleCancel = () => {
      setShowPrompt(false)
    }

    return (
        <div className="Card">
            <p className="content">Posted On: {time.substring(0,10)}</p>
            <h2 className="title">Entry Title: {title}</h2>
            <p className="content">{description}</p>

            {/* only render the image if an imageURL is present */}
            {imgURL && <img className="content" src={imgURL}/>}

            <div className="button-container" style={{margin: "auto 0 0 0"}}>
              <Link to={"/edit/" + id} >
                  <button style={{backgroundColor: "gray", color: "white"}}> Edit </button>
              </Link>
              <button style={{backgroundColor: "#ef233c", color: "white"}} onClick={handleDeleteClick}>Delete</button>
            </div>

            {/* pop-up prompt to ask user if they want to proceed with deleting the entry */}
            {showPrompt && (
              <div className="prompt">
                <h5>Do you want to delete journal entry: {title}?</h5>
                <h5><strong>Warning:</strong> Deleting a journal entry is permanent!</h5>
                <button onClick={handlePermanentDelete} style={{borderColor: "#ef233c"}}>Delete</button>
                <button onClick={handleCancel} style={{borderColor: "#6a994e"}}>Cancel</button>
              </div>
            )}
        </div>
      );
}

export default MoreEntryPage