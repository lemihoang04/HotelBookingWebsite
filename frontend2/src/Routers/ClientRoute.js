import React from "react";

import Home from "../pages/Home/Home";
import Room from "../pages/Room/Room";
import RoomDetail from "../pages/RoomDetail/RoomDetail";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";
import RoomInfo from "../pages/Room/RoomInfo";
import Login_Admin from "../Component/Login/Login_Admin";
import Admin from "../Component/Admin/Admin";
import AboutUs from "../Component/About/AboutUs";
import UserInfo from "../pages/UserInform/UserInfo";
import Bookings from "../pages/Bookings/Bookings";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import PaymentCall from "../pages/Payment/PaymentCall";

const ClientRoute = () => {
	return (
		<div>
			<Switch>
				<AdminRoute path="/admin" component={Admin}></AdminRoute>
				<PrivateRoutes
					path="/information"
					exact
					component={UserInfo}
				></PrivateRoutes>
				<PrivateRoutes path="/ProcessPayment" component={PaymentCall} />
				<PrivateRoutes
					path="/mybookings"
					exact
					component={Bookings}
				></PrivateRoutes>
				<PrivateRoutes path="/rooms/id_room=:id" component={RoomDetail} />
				<Route path="/login_admin">
					<Login_Admin />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/about-us">
					<AboutUs />
				</Route>
				<Route path="/rooms" exact>
					<Room />
				</Route>

				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="*">404 Not Found</Route>
			</Switch>
		</div>
	);
};

export default ClientRoute;
