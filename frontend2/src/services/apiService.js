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
const CreateRoom = (form) => {
    // Tạo một đối tượng FormData để gửi dữ liệu
    const formData = new FormData();
    
    // Thêm các trường thông tin phòng vào FormData
    formData.append("idRoom", form.idRoom);
    formData.append("roomType", form.roomType);
    formData.append("price", form.price);
    formData.append("features", form.features);
    
    // Thêm ảnh duy nhất vào FormData
    if (form.pictures.length > 0) {
      formData.append("picture", form.pictures[0]); // Chỉ thêm tệp đầu tiên
    }
    
    return axios
      .post("/create_room", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Cập nhật header để gửi file
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
	CreateRoom,
	GetBookingID,
	DeleteBookings,
	CreateBooking,
	CreatePayment,
	CheckPayment,
	PaymentZaloPay,
	DeletePayments,
	ChangeRoomAva,
	
};
