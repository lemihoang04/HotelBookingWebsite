import React from "react";

import Home from "../pages/Home/Home";
import Room from "../pages/Room/Room";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";
import RoomInfo from "../pages/Room/RoomInfo";
import Login_Admin from "../Component/Login/Login_Admin";
import Admin from "../Component/Admin/Admin";
import AboutUs from "../Component/About/AboutUs";

const ClientRoute = () => {
	return (
		<div>
			<Switch>
				<Route path="/login_admin">
					<Login_Admin />
				</Route>
				<Route path="/admin">
					<Admin />
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
				<Route path="/rooms/id_room=:id" component={RoomInfo} />
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="*">404 Not Found</Route>
			</Switch>
		</div>
	);
};

export default ClientRoute;
