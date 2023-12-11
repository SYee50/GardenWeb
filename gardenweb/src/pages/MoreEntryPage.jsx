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

    // state variable for image url loading error
    const [imageError, setImageError] = useState(false)

    // state variable for pop-up prompt
    const [showPrompt, setShowPrompt] = useState(false)
  
    useEffect(() => {
      // get current data for id
      const fetchEntry = async () => {
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
  
      fetchEntry();
    }, [id, navigate]);


    // delete journal entry
    const deleteEntry = async (e) => {
      e.preventDefault()

      await supabase
        .from('Entries').delete().eq('id', id)
      
      // redirect to homepage after entry deleted
      navigate('/')
    }

    // user clicks on "Delete" in initial page and pop-up appears
    const handleDeleteClick = () => {
      setShowPrompt(true)
    }

    // user clicks "Delete" in prompt and deletion proceeds
    const handlePermanentDelete = (e) => {
      deleteEntry(e)
      setShowPrompt(false)
    }

    // user clicks "Cancel" and pop-up disappears and nothing else occurs
    const handleCancel = () => {
      setShowPrompt(false)
    }

    // handle image loading error (could be broken link, network/server issues, etc...)
    const handleImgError = () => setImageError(true)


    return (
        <div id="expanded-view-box" className="card app">
            <p className="content">Posted On: {time.substring(0,10)}</p>
            <h2 className="title">Entry Title: {title}</h2>
            <p className="content">{description}</p>

            {/* only render the image if an imageURL is present and the link is not broken */}
            {imgURL && !imageError && <img className="content" src={imgURL} onError={handleImgError}/>}
            {/* display a message letting user know the image url is broken */}
            {imageError && <p>An error occurred while attempting to load the image URL!</p>}

            <div className="button-container" style={{margin: "auto 0 0 0"}}>
              <Link to={"/edit/" + id} >
                  <button id="edit-button"> Edit </button>
              </Link>
              <button id="delete-button" onClick={handleDeleteClick}>Delete</button>
            </div>

            {/* pop-up prompt to ask user if they want to proceed with deleting the entry */}
            {showPrompt && (
              <div className="prompt">
                <h5>Do you want to delete journal entry: <strong>{title}</strong>?</h5>
                <h5><strong>Warning:</strong> Deleting a journal entry is permanent!</h5>
                <button id="delete-button-final" onClick={handlePermanentDelete} >Delete</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}
        </div>
      );
}

export default MoreEntryPage