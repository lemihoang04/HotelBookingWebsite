import React, { useContext } from "react";
import { Button, Modal, NavDropdown } from "react-bootstrap";
import { UserContext } from "../../Context/UserProvider";
import { toast } from "react-toastify";
import { CreateBooking, PaymentZaloPay } from "../../services/apiService";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Booking_Modal = (props) => {
	const { user, getformValue, formValues } = useContext(UserContext);
	const { toggle, isOpen, formValue, handlePaymentMethod, HandlePayment } =
		props;
	const handlePaymentMethodChange = (e) => {
		handlePaymentMethod(e.target.value);
	};
	const history = useHistory();
	const HandleBooking = async () => {
		if (formValue.methodPay === "") {
			toast.error("Fill in Method Payment");
			return;
		} else if (formValue.methodPay === "CashPayment") {
			try {
				let bookings = await CreateBooking(formValue);
				if (bookings && bookings.errCode === 0) {
					await HandlePayment(bookings.id_booking);
				}
				toast.success("Booking Success");
				history.push("/mybookings");
			} catch (e) {
				console.log(e);
			}
		} else if (formValue.methodPay === "PaymentOnline") {
			getformValue(formValue);
			try {
				let payment = await PaymentZaloPay(formValue);
				if (payment && payment.return_code === 1) {
					window.location.href = payment.order_url;
				} else {
					toast.error("Payment Failed");
				}
			} catch (e) {
				toast.error("Error while Deposit Money");
			}
		}
	};
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
									value={user.account.Name}
									readOnly
									// onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-6">
								<label>Room Price</label>
								<input
									type="number"
									className="form-control"
									name="password"
									value={formValue.RoomPrice}
									readOnly
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
									value={formValue.Days}
									readOnly
									// onChange={handleInputChange}
								/>
							</div>
							<div className="col-md-6">
								<label>Total Price</label>
								<input
									type="text"
									className="form-control"
									name="phone"
									value={formValue.TotalPrice}
									readOnly
									// onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
				</Modal.Body>
				<NavDropdown.Divider />
				<Modal.Body>
					<div className="Check_box">
						<div className="check mb-2">
							<input
								type="radio"
								name="column"
								value="CashPayment"
								onChange={handlePaymentMethodChange}
								checked={formValue.methodPay === "CashPayment"}
							/>
							<span className="mx-2">Cash Payment</span>
						</div>
						<div className="check mb-2">
							<input
								type="radio"
								name="column"
								value="PaymentOnline"
								onChange={handlePaymentMethodChange}
								checked={formValue.methodPay === "PaymentOnline"}
							/>
							<span className="mx-2">Payment Online</span>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" className="px-2" onClick={HandleBooking}>
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
