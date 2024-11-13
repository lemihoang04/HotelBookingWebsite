import React from "react";

import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
	const location = useLocation();

	return (
		<>
			{location.pathname === "/admin" ? (
				<></>
			) : (
				<div className="menu-item ">
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
												<NavLink to="/login" activeClassName="active">
													Login
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
