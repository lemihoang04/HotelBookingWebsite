import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const GetDataUser = async () => {

  return {
    firstName: "funda",
    lastName: "coder",
    phone: "777888999",
    email: "funda@gmail.com",
  };
};

const UserInfo = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
  });


  const fetchData = async () => {
    const response = await GetDataUser();
    setUser(response);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", user);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title mb-4">My Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  disabled
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
