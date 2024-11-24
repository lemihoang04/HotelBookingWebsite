import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmModal from "./UserDeleteModal";
import EditUserModal from "./UserEditModal";
import AddUserModal from "./UserAddModal";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  useEffect(() => {
    const sampleData = [
      {
        UserID: 1,
        Name: "Lê Minh Hoàng",
        Email: "minhhoang@example.com",
        Phone: "0123456789",
        CreatedAt: "2024-11-18 10:00 AM",
      },
      {
        UserID: 2,
        Name: "Nguyễn Quang Minh",
        Email: "quangminh@example.com",
        Phone: "0987654321",
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

  const handleAddNewUser = (newUser) => {
    const userID = users.length > 0 ? users[users.length - 1].UserID + 1 : 1;
    setUsers((prev) => [...prev, { UserID: userID, ...newUser }]);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="container mt-4 mx-3 " style={{ width: "1000px" }}>

        <h2 className="mb-4 p-2 border-bottom">Manage Users</h2>
        

      <button
          className="btn btn-primary mb-2"
          onClick={() => setShowAddModal(true)}
        >
          Add New User
        </button>
      <table className="table table-bordered table-striped rounded">
        <thead className="thead-dark">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
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
              <td colSpan="6" className="text-center">
                No users available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <nav>
        <ul className="pagination justify-content-end">
          <li
            className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <button className="page-link">Previous</button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              <button className="page-link">{index + 1}</button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <button className="page-link">Next</button>
          </li>
        </ul>
      </nav> 

      <DeleteConfirmModal
        toggle={() => setShowDeleteModal(!showDeleteModal)}
        isOpen={showDeleteModal}
        user={selectedUser}
        onConfirm={() => {
          setUsers((prevUsers) =>
            prevUsers.filter((u) => u.UserID !== selectedUser.UserID)
          );
          setSelectedUser(null);
          setShowDeleteModal(false);
        }}
      />

      <EditUserModal
        toggle={() => setShowEditModal(!showEditModal)}
        isOpen={showEditModal}
        user={selectedUser}
        onSave={(updatedUser) => {
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u.UserID === updatedUser.UserID ? updatedUser : u
            )
          );
          setSelectedUser(null);
          setShowEditModal(false);
        }}
      />

      <AddUserModal
        toggle={() => setShowAddModal(!showAddModal)}
        isOpen={showAddModal}
        onSave={handleAddNewUser}
      />
    </div>
  );
};

export default ManageUsers;
