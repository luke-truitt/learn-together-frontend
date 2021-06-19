import "./App.css";
import { Button, Typography, AppBar, Toolbar } from "@material-ui/core";
import cat from "./resources/cat.png";
import dog from "./resources/dog.png";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import { useState } from "react";
import axios from "axios";

// API connection
const BASE_ENDPOINT = "https://lt-model.herokuapp.com/";

function App() {
  // State variables
  const [image, setImage] = useState(null);
  const [cats, setCats] = useState(0);
  const [dogs, setDogs] = useState(0);
  const [curr, setCurr] = useState(null);

  const incrementCats = () => {
    setCats(cats + 1);
    setCurr("cat");
  };

  const incrementDogs = () => {
    setDogs(dogs + 1);
    setCurr("dog");
  };

  const removeImage = () => {
    setImage(null);
  };

  const processImage = () => {
    const upload_endpoint = BASE_ENDPOINT + "predict";
    const formData = new FormData();
    formData.append("file", image);
    // const data = { file: image };
    // Get URL for image
    console.log(upload_endpoint);
    axios.post(upload_endpoint, formData).then(
      (response) => {
        var result = response.data;
        if(result.class_id == "0") {
          console.log("CAT")
          incrementCats()
        } else {
          console.log("DOG")
          incrementDogs()
        }
        removeImage()
      },
      (error) => {
        console.log(error);
        removeImage()
      }
    );
    // POST URL to model and retrieve result and increment cats or dogs
    // TODO: @Luke
  };

  return (
    <div className="App">
      <div className="appbar-container">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Machine Learning Web App</Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className="content cols">
        <div className="upload-container rows">
          {image ? (
            <div className="image-container rows">
              <Typography>Image uploaded: {image.name}</Typography>
            </div>
          ) : (
            <div className="image-container rows">
              <CloudUploadOutlinedIcon fontSize="large" />
              <Button component="label">
                Click here to select an image from your computer
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Button>
            </div>
          )}

          <div className="btn-container cols">
            <Button
              disabled={image == null}
              className="remove-btn"
              variant="contained"
              onClick={removeImage}
            >
              Remove image
            </Button>
            <Button
              disabled={image == null}
              className="process-btn"
              variant="contained"
              onClick={processImage}
            >
              Process Image
            </Button>
          </div>
        </div>
        <div className="display-container ">
          <div className="update-container">
            {curr ? (
              <Typography className="update-text">
                A new {curr} has been added!
              </Typography>
            ) : (
              <div />
            )}
          </div>

          <div className="display-row cols">
            <img src={cat} className="emoji" />
            <Typography>{cats} cats</Typography>
          </div>
          <div className="display-row cols">
            <img src={dog} className="emoji" />
            <Typography>{dogs} dogs</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
