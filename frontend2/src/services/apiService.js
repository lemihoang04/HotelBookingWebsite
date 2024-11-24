import axios from "../setup/axios";
const GetAllRooms = () => {
	return axios
		.get("/rooms", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
		});
};
const GetBookingID = (id) => {
	return axios
		.get(`/bookings/${id}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
		});
};
const DeleteBookings = (booking_id) => {
	return axios
		.delete(`/bookings/${booking_id}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
		});
};
const DeletePayments = (booking_id) => {
	return axios
		.delete(`/payments/${booking_id}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
		});
};
const CreateBooking = (form) => {
	return axios
		.post("/bookings", form, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
		});
};
const CreatePayment = (form) => {
	return axios
		.post("/payments", form, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
		});
};
const CheckPayment = async (apptransid) => {
	return axios.post(
		"/payment/CheckZaloPay",
		{ app_trans_id: apptransid },
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		}
	);
};
const PaymentZaloPay = async (user) => {
	return axios.post("/create_order", user, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
};
const ChangeRoomAva = async (form) => {
	return axios.put(`/rooms/${form.RoomID}`, form, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
};
export {
	GetAllRooms,
	GetBookingID,
	DeleteBookings,
	CreateBooking,
	CreatePayment,
	CheckPayment,
	PaymentZaloPay,
	DeletePayments,
	ChangeRoomAva,
};
