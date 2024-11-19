import React, { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";
import Cookies from "js-cookie";
const UserContext = createContext({ name: "", auth: false });
const UserProvider = ({ children }) => {
	// User is the name of the "data" that gets stored in context
	const userDefault = {
		isLoading: true,
		isAuthenticated: false,
		account: {},
	};
	const [user, setUser] = useState(userDefault);

	// Login updates the user data with a name parameter
	const loginContext = (userData) => {
		setUser({ ...userData, isLoading: false });
	};
	const logoutContext = () => {
		setUser({ ...userDefault, isLoading: false });
	};
	// Logout updates the user data to default
	const logout = () => {
		setUser((user) => ({
			name: "",
			auth: false,
		}));
	};

	const fetchUser = async () => {
		try {
			const response = await getUserAccount();
			if (response && response.errCode === 0) {
				const { id, email, fullName } = response.user;
				setUser({
					isAuthenticated: true,
					account: { id, email, fullName },
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

	useEffect(() => {
		if (
			window.location.pathname !== "/login" &&
			window.location.pathname !== "/register"
		) {
			fetchUser();
		} else {
			setUser({ ...user, isLoading: false });
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, loginContext, logout, logoutContext }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
