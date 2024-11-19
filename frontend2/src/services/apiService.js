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
export { GetAllRooms };
