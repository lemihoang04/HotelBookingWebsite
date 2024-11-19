import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmModal from "./UserDeleteModal";
import EditUserModal from "./UserEditModal";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const sampleData = [
      {
        UserID: 1,
        Name: "Lê Minh Hoàng",
        Email: "minhhoang@example.com",
        Phone: "0123456789",
        Password: "password123",
        CreatedAt: "2024-11-18 10:00 AM",
      },
      {
        UserID: 2,
        Name: "Nguyễn Quang Minh",
        Email: "quangminh@example.com",
        Phone: "0987654321",
        Password: "securepass456",
        CreatedAt: "2024-11-19 11:00 AM",
      },
    ];
    setUsers(sampleData);
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleConfirmDelete = () => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.UserID !== selectedUser.UserID));
    setSelectedUser(null);
  };

  const handleSaveEdit = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.UserID === updatedUser.UserID ? updatedUser : u))
    );
    setSelectedUser(null);
  };

  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Users</h2>
      <table className="table table-bordered table-striped rounded">
        <thead className="thead-dark">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Password</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.UserID}>
                <td>{user.UserID}</td>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Phone}</td>
                <td>{user.Password}</td>
                <td>{user.CreatedAt}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mr-2"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No users available.
              </td>
            </tr>
          )}
        </tbody>
      </table>


      <DeleteConfirmModal
        toggle={toggleDeleteModal}
        isOpen={showDeleteModal}
        user={selectedUser}
        onConfirm={handleConfirmDelete}
      />


      <EditUserModal
        toggle={toggleEditModal}
        isOpen={showEditModal}
        user={selectedUser}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default ManageUsers;
