import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import {
  fetchUserDetail,
  fetchUserAlbum,
  updateUser,
  createAlbum,
  deleteAlbum,
} from "../../service/service";
import "./UserDetail.css";

const UserDetails = () => {
  const [data, setData] = useState({});
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();

  const getUserId = async () => {
    try {
      const response = await fetchUserDetail(id);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAlbum = async () => {
    try {
      const response = await fetchUserAlbum(id);
      setAlbums(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setNewAlbumTitle(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(id, data);
      setData(response);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const newId = albums.length > 0 ? albums[albums.length - 1].id + 1 : 1;

    const newAlbum = {
      id: newId,
      title: newAlbumTitle,
    };

    try {
      const response = await createAlbum(newAlbum);
      console.log("Album Created: ", response);
      setAlbums((prev) => [...prev, newAlbum]);
      setNewAlbumTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAlbum(id);
      const updatedAlbums = albums.filter((album) => album.id !== id);
      const reorderedAlbums = updatedAlbums.map((album, index) => ({
        ...album,
        id: updatedAlbums[0].id + index,
      }));
      setAlbums(reorderedAlbums);
    } catch (error) {
      console.error("Error deleting album: ", error);
    }
  };

  useEffect(() => {
    getUserId();
    getUserAlbum();
  }, []);

  return (
    <>
      <div className="user-detail">
        <div className="container">
          <h1>{data.name}</h1>
          <div className="user-detail__content">
            <div className="column-01">
              <div className="user-personal">
                <h2 className="column-title">Personal:</h2>
                <div className="column-wrapper">
                  <div className="user-personal__tag">
                    <span>Id:</span>
                    <span>Username: </span>
                  </div>
                  <div className="user-personal__data">
                    <span>{data.id}</span>
                    <span>{data.username}</span>
                  </div>
                </div>
              </div>

              <div className="user-address">
                <h2 className="column-title">Address:</h2>
                <div className="column-wrapper">
                  <div className="user-personal__tag">
                    <span>Street:</span>
                    <span>Suite:</span>
                    <span>City:</span>
                    <span>Zipcode:</span>
                  </div>
                  <div className="user-personal__data">
                    <span>{data?.address?.street}</span>
                    <span>{data?.address?.suite}</span>
                    <span>{data?.address?.city}</span>
                    <span>{data?.address?.zipcode}</span>
                  </div>
                </div>
              </div>

              <div className="user-company">
                <h2 className="column-title">Company:</h2>
                <div className="column-wrapper">
                  <div className="user-personal__tag">
                    <span>Name:</span>
                    <span>CatchPharse:</span>
                    <span>Bs:</span>
                  </div>
                  <div className="user-personal__data">
                    <span>{data?.company?.name}</span>
                    <span>{data?.company?.catchPhrase}</span>
                    <span>{data?.company?.bs}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="column-02">
              <div className="user-contact">
                <h2 className="column-title">Contact:</h2>
                {isEdit ? (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="input-group">
                        <span>Email:</span>
                        <input
                          name="email"
                          type="text"
                          value={data.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="input-group">
                        <span>Website:</span>
                        <input
                          name="website"
                          type="text"
                          value={data.website}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="input-group">
                        <span>Phone:</span>
                        <input
                          name="phone"
                          type="text"
                          value={data.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="btn-group">
                        <button type="submit" className="btn-action submit">
                          Submit
                        </button>

                        <button
                          className="btn-action reset"
                          onClick={() => handleReset()}
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="column-wrapper">
                      <div className="user-personal__tag">
                        <span>Email:</span>
                        <span>Website:</span>
                        <span>Phone:</span>
                      </div>
                      <div className="user-personal__data">
                        <span>{data.email}</span>
                        <span>{data.website}</span>
                        <span>{data.phone}</span>
                      </div>
                    </div>
                    <button
                      className="btn-action edit"
                      onClick={() => handleEdit()}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="user-albums">
            <h1>Photos Albums:</h1>
            <form onSubmit={handleCreate}>
              <input
                name="title"
                type="text"
                onChange={handleChange}
                placeholder="Title of new album"
              />
              <button type="submit">New Album</button>
            </form>
            <div className="album-list">
              <>
                {albums.map((alb) => {
                  return (
                    <div className="album" key={alb.id}>
                      <span>{alb.id}</span>
                      <div className="album-content">
                        <p>{alb.title}</p>
                        <button
                          type="submit"
                          onClick={() => handleDelete(alb.id)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
