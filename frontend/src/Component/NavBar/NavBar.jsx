import React from "react";
import "../../assets/css/style.css";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
	const location = useLocation();

	return (
		<>
			{location.pathname === "/login" || location.pathname === "/register" ? (
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
										<ul>
											<li>
												<NavLink to="/" exact activeClassName="active">
													Home
												</NavLink>
											</li>
											<li>
												<NavLink to="/rooms" activeClassName="active">
													Rooms
												</NavLink>
											</li>
											<li>
												<NavLink to="/about-us" activeClassName="active">
													About Us
												</NavLink>
											</li>
											<li>
												<NavLink to="/pages" activeClassName="active">
													Pages
												</NavLink>
												<ul className="dropdown">
													<li>
														<NavLink
															to="/room-details"
															activeClassName="active"
														>
															Room Details
														</NavLink>
													</li>
													<li>
														<NavLink
															to="/blog-details"
															activeClassName="active"
														>
															Blog Details
														</NavLink>
													</li>
													<li>
														<NavLink to="/family-room" activeClassName="active">
															Family Room
														</NavLink>
													</li>
													<li>
														<NavLink
															to="/premium-room"
															activeClassName="active"
														>
															Premium Room
														</NavLink>
													</li>
												</ul>
											</li>
											<li>
												<NavLink to="/blog" activeClassName="active">
													News
												</NavLink>
											</li>
											<li>
												<NavLink to="/contact" activeClassName="active">
													Contact
												</NavLink>
											</li>
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
