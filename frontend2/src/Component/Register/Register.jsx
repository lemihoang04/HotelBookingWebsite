import React from "react";
import "../Login/login.css";
import blogImage from "../../assets/images/blog-1.jpg";
const Register = () => {
	return (
		<div className="login-page">
			<div className="wrapper">
				<div className="container main">
					<div className="row">
						<div className="col-md-6 mt-5 side-image">
							<img src={blogImage} alt="" />;
						</div>

						<div className="col-md-6 right">
							<div className="input-box">
								<header>Login</header>
								<div className="input-field">
									<input
										type="text"
										className="input"
										id="email"
										required=""
										name="username"
										autoComplete="off"
									/>
									<label htmlFor="email">Email</label>
								</div>
								<div className="input-field">
									<input
										type="password"
										name="password"
										className="input"
										id="pass"
										required=""
									/>
									<label htmlFor="pass">Password</label>
								</div>
								<div className="input-field">
									<input type="submit" className="submit" value="Sign Up" />
								</div>
								<div className="signin">
									<span>
										Already have an account? <a href="#">Login here</a>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
