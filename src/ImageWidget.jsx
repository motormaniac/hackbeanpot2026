import { useState } from "react";

const ISLAND_IDLE = "./doghbp.png";
const ISLAND_HOVER = "./doghover.png";

function ImageWidget() {
  const [imageUrl, setImageUrl] = useState(ISLAND_IDLE);

  return (
    <div className="widget image-widget">
      <h2> Your Island</h2>
      <div className="image-container"
      onMouseOver={() => setImageUrl(ISLAND_HOVER)}
      onMouseOut={() => setImageUrl(ISLAND_IDLE)}>
        <img
          src={imageUrl}
          className="island"
          alt="Island"
          width="5000"
          height="5000"

        />
      </div>
    </div>
  );
}

export default ImageWidget;
