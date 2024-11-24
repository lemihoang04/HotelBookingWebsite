import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import { NavDropdown, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { LogOutUser } from "../../services/userService";

const NavBar = () => {
	const location = useLocation();
	const { user, logoutContext, admin } = useContext(UserContext);
	const history = useHistory();
	const HanldeLogout = async () => {
		let data = await LogOutUser();
		logoutContext();
		if (data && data.errCode === 0) {
			history.push("/");
			toast.success("Log out success");
		} else {
			toast.error(data.errMessage);
		}
	};
	return (
		<>
			{location.pathname === "/admin" ? (
				<></>
			) : (
				<div className="menu-item">
					<div className="container">
						<div className="row">
							<div className="col-lg-2">
								<div className="logo">
									<NavLink to="/">
										<img
											src={require("../../pages/Home/img/logo.png")}
											alt="Logo"
										/>
									</NavLink>
								</div>
							</div>
							<div className="col-lg-10">
								<div className="nav-menu">
									<nav className="mainmenu">
										<ul className="d-flex justify-content-start align-items-center mb-0">
											<li className="mx-3">
												<NavLink to="/" exact activeClassName="active">
													Home
												</NavLink>
											</li>
											<li className="mx-3">
												<NavLink to="/rooms" activeClassName="active">
													Rooms
												</NavLink>
											</li>
											<li className="mx-3">
												<NavLink to="/about-us" activeClassName="active">
													About Us
												</NavLink>
											</li>

											{user &&
											user.isAuthenticated === false &&
											admin &&
											admin.isAuthenticated === false ? (
												<li className="mx-3">
													<NavLink to="/login" activeClassName="active">
														Login
													</NavLink>
												</li>
											) : (
												<NavDropdown
													title={`Welcome, ${user.account.Name || "Admin"}`}
													className="NavDropdown mt-1 menu-item-dropdown"
													id="basic-nav-dropdown"
												>
													<NavDropdown.Item as={NavLink} to="/mybookings">
														My Bookings
													</NavDropdown.Item>
													<NavDropdown.Divider />
													<NavDropdown.Item as={NavLink} to="/information">
														My Profile
													</NavDropdown.Item>

													<NavDropdown.Divider />
													<NavDropdown.Item onClick={() => HanldeLogout()}>
														<span>Log out</span>
													</NavDropdown.Item>
												</NavDropdown>
											)}
										</ul>
									</nav>
									<div className="nav-right search-switch">
										<i className="icon_search"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default NavBar;
