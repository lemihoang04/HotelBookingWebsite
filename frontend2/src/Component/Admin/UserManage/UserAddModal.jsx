import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddUserModal = ({ isOpen, toggle, onSave }) => {
  const [newUser, setNewUser] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    CreatedAt: new Date().toLocaleString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const { Name, Email, Phone, Password } = newUser;

    // Validate input fields
    if (!Name || !Email || !Phone || !Password) {
      alert("Please fill all fields!");
      return;
    }

    onSave(newUser);
    toggle(); // Close modal
    setNewUser({
      Name: "",
      Email: "",
      Phone: "",
      Password: "",
      CreatedAt: new Date().toLocaleString(),
    });
  };

  return (
    <Modal show={isOpen} onHide={toggle} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              placeholder="Enter full name"
              value={newUser.Name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              placeholder="Enter email address"
              value={newUser.Email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="Phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="Phone"
              placeholder="Enter phone number"
              value={newUser.Phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="Password"
              placeholder="Enter password"
              value={newUser.Password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="CreatedAt">
            <Form.Label>Created At</Form.Label>
            <Form.Control
              type="text"
              name="CreatedAt"
              readOnly
              value={newUser.CreatedAt}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={toggle}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
