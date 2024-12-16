import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser, fetchUserDetail } from "../../service/service";
import "./UserPage.css";

const UserPage = () => {
  const [users, setUser] = useState([]);

  const nav = useNavigate();

  const getUsers = async () => {
    try {
      const data = await fetchUser();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersById = async (id) => {
    nav(`/users/${id}`);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <section className="user-page">
        <div className="container">
          <h1 className="title">Users</h1>
          <table className="user-page__table">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>username</th>
                <th>email</th>
                <th>phone</th>
                <th>website</th>
                <th>city</th>
                <th>company name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id} onClick={() => getUsersById(user.id)}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>{user.address.city}</td>
                    <td>{user.company.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default UserPage;
