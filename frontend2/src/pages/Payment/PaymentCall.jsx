import React, { useContext, useEffect, useRef, useState } from "react";
import {
	ChangeRoomAva,
	CheckPayment,
	CreateBooking,
	CreatePayment,
} from "../../services/apiService";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../Context/UserProvider";

const PaymentCall = () => {
	const history = useHistory();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const appTransId = queryParams.get("apptransid");
	const id_user = queryParams.get("id_user");
	const status = queryParams.get("status");
	const amount = queryParams.get("amount");
	const hasChecked = useRef(false);
	const { getformValue } = useContext(UserContext);

	// Lấy dữ liệu từ localStorage khi component mount
	const [dataValue, setDataValue] = useState(
		JSON.parse(localStorage.getItem("formValues")) || {}
	);

	const handleCheck = async () => {
		let data = { id_user: id_user, amount: amount };
		if (hasChecked.current) return;
		hasChecked.current = true;

		if (status !== "-49") {
			const paymentStatus = await CheckPayment(appTransId);
			if (paymentStatus && paymentStatus.return_code === 1) {
				try {
					let bookings = await CreateBooking(dataValue);
					const updatedFormValue = {
						...dataValue,
						BookingID: bookings.id_booking,
						PaymentStatus: "Completed",
						Availability: "1",
					};
					setDataValue(updatedFormValue);
					getformValue(updatedFormValue); // Cập nhật context và localStorage
					if (bookings && bookings.errCode === 0) {
						await CreatePayment(updatedFormValue);
						await ChangeRoomAva(updatedFormValue);
					}
					toast.success("Booking Success");
					history.push("/mybookings");
				} catch (e) {
					console.log(e);
				}
			} else {
				toast.error(paymentStatus.return_message);
				history.push("/rooms");
			}
		} else {
			toast.error("Transaction Failed");
			history.push("/rooms");
		}
	};

	useEffect(() => {
		handleCheck();
	}, []);

	return null;
};

export default PaymentCall;
