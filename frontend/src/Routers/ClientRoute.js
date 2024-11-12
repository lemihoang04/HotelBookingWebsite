import React from "react";

import Home from "../pages/Home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";

const ClientRoute = () => {
	return (
		<div>
			<Switch>
				{/* <PrivateRoutes path="/users" component={Users} />
				<PrivateRoutes path="/ticket" exact component={Ticket} />
				<PrivateRoutes path="/info-car/id=:id_user" component={InfoCar} />
				<PrivateRoutes path="/ticket/create" component={Add_Ticket} />
				<PrivateRoutes path="/ProcessPayment" component={PaymentCall} />
				<PrivateRoutes path="/SlotCar" component={Slot_Car} />
				<PrivateRoutes path="/Account/DepositMoney" component={DepositMoney} /> */}
				{/* <Route path="/admin">
					<Login_Admin />
				</Route> */}
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/users">users</Route>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="*">404 Not Found</Route>
			</Switch>
		</div>
	);
};

export default ClientRoute;
