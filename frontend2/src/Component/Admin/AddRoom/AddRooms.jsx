import React, { useState } from "react";
import { CreateRoom } from "../../../services/apiService";
import { toast } from "react-toastify";

const AddRooms = (props) => {
	const { changeWindow } = props;
	const [roomData, setRoomData] = useState({
		idRoom: "",
		roomType: "",
		price: "",
		features: "",
		pictures: [],
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setRoomData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setRoomData((prev) => ({
				...prev,
				pictures: [file],
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await CreateRoom(roomData);
			if (response && response.errCode === 0) {
				toast.success(response.message);
				changeWindow();
			} else {
				toast.error(response.error);
			}
		} catch (error) {
			console.log(error);
			toast.error("Error adding room:", error);
		}
	};

	return (
		<div className="container my-4 mx-3" style={{ width: "950px" }}>
			<h2 className="mb-4 p-2 border-bottom">Add Room</h2>
			<form onSubmit={handleSubmit}>
				<div className="row mb-3">
					<div className="col-md-6">
						<label htmlFor="idRoom" className="form-label">
							ID Room
						</label>
						<input
							type="text"
							className="form-control"
							id="idRoom"
							name="idRoom"
							value={roomData.idRoom}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="roomType" className="form-label">
							Room Type
						</label>
						<select
							className="form-select"
							id="roomType"
							name="roomType"
							value={roomData.roomType}
							onChange={handleChange}
							required
						>
							<option value="" disabled>
								Select Room Type
							</option>
							<option value="Standard Room">Standard Room</option>
							<option value="Deluxe Room">Deluxe Room</option>
							<option value="Suite Room">Suite Room</option>
							<option value="Family Room">Family Room</option>
						</select>
					</div>
				</div>

				<div className="mb-3">
					<label htmlFor="price" className="form-label">
						Price
					</label>
					<input
						type="number"
						className="form-control"
						id="price"
						name="price"
						value={roomData.price}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="features" className="form-label">
						Features
					</label>
					<textarea
						className="form-control"
						id="features"
						name="features"
						rows="3"
						value={roomData.features}
						onChange={handleChange}
						required
					></textarea>
				</div>

				<div className="mb-3">
					<label htmlFor="pictures" className="form-label">
						Picture
					</label>
					<input
						type="file"
						className="form-control"
						id="pictures"
						name="pictures"
						onChange={handleFileChange}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Preview Picture</label>
					<div>
						{roomData.pictures.length > 0 && (
							<img
								src={URL.createObjectURL(roomData.pictures[0])}
								alt="Preview"
								style={{
									width: "100px",
									height: "100px",
									objectFit: "cover",
									marginRight: "10px",
								}}
							/>
						)}
					</div>
				</div>

				<button type="submit" className="btn btn-primary">
					Add Room
				</button>
			</form>
		</div>
	);
};

export default AddRooms;
