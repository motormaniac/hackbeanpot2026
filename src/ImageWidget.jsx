import { useState } from "react";
import ourisland from "/doghbp.png";

function ImageWidget() {
  const [imageUrl, setImageUrl] = useState("https://picsum.photos/500/300");
  const [inputUrl, setInputUrl] = useState("");

  const updateImage = () => {
    if (inputUrl.trim()) {
      setImageUrl(inputUrl);
      setInputUrl("");
    }
  };

  const randomImage = () => {
    setImageUrl(`https://picsum.photos/500/300?random=${Date.now()}`);
  };

  return (
    <div className="widget image-widget">
      <h2> Your Island</h2>
      <div className="image-container">
        {/* <img src={imageUrl} alt="Display" /> */}
        <img
          src={ourisland}
          className="island"
          alt="Island"
          width="5000"
          height="5000"

        />
      </div>

      {/* <div className="image-controls">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && updateImage()}
          placeholder="Enter image URL..."
        />
        <button onClick={updateImage}>Load</button>
        <button onClick={randomImage}>Random</button>
      </div> */}
    </div>
  );
}

export default ImageWidget;
