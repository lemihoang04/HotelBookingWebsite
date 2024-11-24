import React, { createContext, useEffect, useState } from "react";
import { getAdminAccount, getUserAccount } from "../services/userService";
const UserContext = createContext({ name: "", auth: false });
const UserProvider = ({ children }) => {
	// User is the name of the "data" that gets stored in context
	const userDefault = {
		isLoading: true,
		isAuthenticated: false,
		account: {},
	};
	const initialFormValues = JSON.parse(localStorage.getItem("formValues")) || {
		UserID: "",
		userName: "",
		Days: "",
		RoomPrice: "",
		TotalPrice: "",
		CheckInDate: "",
		CheckOutDate: "",
		methodPay: "",
		RoomID: "",
		BookingID: "",
		BookingStatus: "Confirmed",
		PaymentStatus: "",
		Availability: "",
	};

	const [formValues, setFormValue] = useState(initialFormValues);
	const [user, setUser] = useState(userDefault);
	const [admin, setAdmin] = useState(userDefault);

	// Login updates the user data with a name parameter
	const loginContext = (userData) => {
		setUser({ ...userData, isLoading: false });
	};
	const loginAdmin = (userData) => {
		setAdmin({ ...userData, isLoading: false });
	};
	const logoutContext = () => {
		setUser({ ...userDefault, isLoading: false });
		setAdmin({ ...userDefault, isLoading: false });
	};
	// Logout updates the user data to default
	const logout = () => {
		setUser((user) => ({
			name: "",
			auth: false,
		}));
	};
	const getformValue = (form) => {
		const updatedForm = {
			UserID: form.UserID,
			userName: form.userName,
			Days: form.Days,
			RoomPrice: form.RoomPrice,
			TotalPrice: form.TotalPrice,
			CheckInDate: form.CheckInDate,
			CheckOutDate: form.CheckOutDate,
			methodPay: form.methodPay,
			RoomID: form.RoomID,
			BookingID: form.BookingID,
			BookingStatus: "Confirmed",
			PaymentStatus: form.PaymentStatus,
			Availability: form.Availability,
		};
		setFormValue(updatedForm);

		localStorage.setItem("formValues", JSON.stringify(updatedForm));
	};

	useEffect(() => {
		localStorage.setItem("formValues", JSON.stringify(formValues));
	}, [formValues]);

	const fetchUser = async () => {
		try {
			const response = await getUserAccount();
			if (response && response.errCode === 0) {
				const { UserID, Email, Name, Phone } = response.user;
				setUser({
					isAuthenticated: true,
					account: { UserID, Email, Name, Phone },
					isLoading: false,
				});
			} else {
				setUser({ ...userDefault, isLoading: false });
			}
		} catch (error) {
			console.error("Error fetching user:", error);
			setUser({ ...userDefault, isLoading: false });
		}
	};
	const fetchAdmin = async () => {
		try {
			const response2 = await getAdminAccount();
			if (response2 && response2.errCode === 0) {
				const { Email, Name, Phone } = response2.user;
				setAdmin({
					isAuthenticated: true,
					account: { Email, Name, Phone },
					isLoading: false,
				});
			} else {
				setAdmin({ ...userDefault, isLoading: false });
			}
		} catch (error) {
			console.error("Error fetching user:", error);
			setAdmin({ ...userDefault, isLoading: false });
		}
	};

	useEffect(() => {
		if (
			window.location.pathname !== "/login" &&
			window.location.pathname !== "/register"
		) {
			fetchUser();
			fetchAdmin();
		} else {
			setUser({ ...user, isLoading: false });
			setAdmin({ ...admin, isLoading: false });
		}
	}, []);

	return (
		<UserContext.Provider
			value={{
				user,
				loginContext,
				logout,
				logoutContext,
				fetchUser,
				admin,
				loginAdmin,
				getformValue,
				formValues,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
