import React from "react";
import { Button, Modal } from "react-bootstrap";

const Booking_Modal = (props) => {
	const { toggle, isOpen } = props;
	return (
		<div className="text-center">
			<Modal
				show={isOpen}
				onHide={() => {
					toggle();
				}}
				centered
				size="lg"
			>
				<Modal.Header closeButton>
					<Modal.Title>Booking Room</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="modal-user-body">
						<div className="row mb-3">
							<div className="col-md-6">
								<label>User Name</label>
								<input
									type="text"
									className="form-control"
									name="email"
									// value={formValues.email}
									// onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-6">
								<label>Room Price</label>
								<input
									type="number"
									className="form-control"
									name="password"
									// value={formValues.password}
									// onChange={handleInputChange}
								/>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-md-6">
								<label>No of Days</label>
								<input
									type="text"
									className="form-control"
									name="fullName"
									// value={formValues.fullName}
									// onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-6">
								<label>Total Price</label>
								<input
									type="text"
									className="form-control"
									name="phone"
									// value={formValues.phone}
									// onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" className="px-2">
						Confirm your Booking
					</Button>
					<Button
						variant="secondary"
						className="px-2"
						onClick={() => toggle("isOpenModalUser")}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Booking_Modal;
