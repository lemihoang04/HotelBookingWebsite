import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteConfirmModal = ({ toggle, isOpen, room, onConfirm }) => {
	return (
		<Modal show={isOpen} onHide={toggle} centered size="md">
			<Modal.Header closeButton>
				<Modal.Title>Confirm Delete</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					Are you sure you want to delete the room{" "}
					<strong>Room ID: {room?.RoomID}</strong> of type{" "}
					<strong>{room?.RoomType}</strong>?
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={toggle}>
					Cancel
				</Button>
				<Button
					variant="danger"
					onClick={() => {
						onConfirm(room.RoomID);
						toggle();
					}}
				>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteConfirmModal;
