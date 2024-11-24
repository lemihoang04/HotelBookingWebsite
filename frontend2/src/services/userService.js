import axios from "../setup/axios";
const LoginUser = (data) => {
	return axios
		.post("/login", data, {
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
const LoginAdmin = (data) => {
	return axios
		.post("/loginAdmin", data, {
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

const CreateNewUser = (data) => {
	return axios
		.post("/api/create-new-user", data)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
		});
};
const GetAllUser = (InputId) => {
	return axios
		.get(`/api/get-all-user?id=${InputId}`)
		.then((response) => {
			return response;
		})
		.catch((err) => {
			console.log(err);
		});
};
const getUserAccount = () => {
	return axios.get("/api/account");
};
const getAdminAccount = () => {
	return axios.get("/api/admin");
};
const LogOutUser = () => {
	return axios.post("/logout");
};
const EditUserService = (user_edit, formValue) => {
	return axios.put(`/users/${user_edit}`, formValue, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
};
const DeleteUser = (idUser) => {
	return axios.delete("/api/delete-user", { data: { id: idUser } });
};
export {
	LoginUser,
	LoginAdmin,
	CreateNewUser,
	GetAllUser,
	getAdminAccount,
	getUserAccount,
	LogOutUser,
	EditUserService,
	DeleteUser,
};
