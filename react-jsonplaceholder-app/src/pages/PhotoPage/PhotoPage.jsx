import { useState, useEffect } from "react";
import { fetchPhotos } from "../../service/service";

import "./PhotoPage.css";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [limit] = useState(12);

  const getPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetchPhotos(start, limit);
      setPhotos((prevPhotos) => [...prevPhotos, ...response]);
      setStart((prevStart) => prevStart + limit);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div className="container">
      <h1>Photos</h1>
      <div className="photo-gallery">
        {photos.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <div className="photo-content">
              <p>{photo.title}</p>
              <span>Id: #{photo.id}</span>
              <span>Album Id: #{photo.albumId}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more">
        <button onClick={getPhotos} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default PhotoGallery;
