import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const EditUserModal = ({ toggle, isOpen, user, onSave }) => {
	const [formData, setFormData] = useState(user || {});

	useEffect(() => {
		if (user) {
			setFormData(user);
		}
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = () => {
		// Validate fields
		if (!formData.Name || !formData.Email || !formData.Phone) {
			alert("Please fill all required fields.");
			return;
		}

		onSave(formData.UserID, formData);
		toggle();
	};

	return (
		<Modal show={isOpen} onHide={toggle} centered size="md">
			<Modal.Header closeButton>
				<Modal.Title>Edit User</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="Name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							name="Name"
							placeholder="Enter name"
							value={formData.Name || ""}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="Email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							name="Email"
							placeholder="Enter email"
							value={formData.Email || ""}
							onChange={handleChange}
							required
							readOnly
						/>
					</Form.Group>

					<Form.Group controlId="Phone">
						<Form.Label>Phone</Form.Label>
						<Form.Control
							type="text"
							name="Phone"
							placeholder="Enter phone number"
							value={formData.Phone || ""}
							onChange={handleChange}
							required
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={toggle}>
					Cancel
				</Button>
				<Button variant="primary" onClick={handleSave}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default EditUserModal;
