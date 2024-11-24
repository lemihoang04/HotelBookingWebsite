import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../Context/UserProvider";

const AdminRoute = (props) => {
	const { admin } = useContext(UserContext);

	if (admin && admin.isAuthenticated === true) {
		return (
			<div>
				<Route path={props.path} component={props.component} />
			</div>
		);
	} else {
		return <Redirect to="/"></Redirect>;
	}
};

export default AdminRoute;
