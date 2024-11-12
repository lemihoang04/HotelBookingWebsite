import React, { useState } from "react";
import "../Login/login.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { LoginUser } from "../../services/userService";

const Login = () => {
	const history = useHistory();
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
	});
	const defaultobjvalidinput = {
		isValidLogin: true,
		isValidPass: true,
	};
	const [objvalidinput, setObjvalidinput] = useState(defaultobjvalidinput);
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};
	const HandleCreateAccount = () => {
		history.push("/register");
	};
	const ReHomePage = () => {
		history.push("/");
	};
	const HandleLogin = async (e) => {
		e.preventDefault();
		setObjvalidinput(defaultobjvalidinput);
		if (!formValues.email && !formValues.password) {
			setObjvalidinput({
				...defaultobjvalidinput,
				isValidLogin: false,
				isValidPass: false,
			});
			toast.error("Please fill in your email and password");
			return;
		}
		if (!formValues.email) {
			setObjvalidinput({ ...defaultobjvalidinput, isValidLogin: false });
			toast.error("Please fill in your email");
			return;
		}
		if (!formValues.password) {
			setObjvalidinput({ ...defaultobjvalidinput, isValidPass: false });
			toast.error("Please fill in your password");
		}
		try {
			const response = await LoginUser(formValues);
			console.log("res", response);
			if (response && response.errCode === 0) {
				toast.success("Success Login");
				history.push("/");
			} else {
				toast.error(response.error);
			}
		} catch (e) {
			console.log(e);
			toast.error("Login failed. Please try again.");
		}
	};
	return (
		<div className="login-page">
			<div className="wrapper">
				<div className="container main">
					<div className="row">
						<div className="col-md-6 side-image">
							{/* <img src="../view/img/blog/blog-1.jpg" alt=""> */}
						</div>

						<div className="col-md-6 right">
							<div className="input-box">
								<header>Login</header>
								<div className="input-field">
									<input
										type="text"
										className={
											objvalidinput.isValidLogin
												? "form-control input"
												: "is-invalid form-control input"
										}
										id="email"
										name="email"
										value={formValues.email}
										onChange={handleInputChange}
										required=""
										autoComplete="off"
									/>
									<label htmlFor="email">Email</label>
								</div>
								<div className="input-field">
									<input
										type="password"
										className={
											objvalidinput.isValidPass
												? "form-control input"
												: "is-invalid form-control input"
										}
										name="password"
										value={formValues.password}
										onChange={handleInputChange}
										id="pass"
										required=""
									/>
									<label htmlFor="pass">Password</label>
								</div>
								<div className="input-field">
									<input
										type="submit"
										className="submit"
										onClick={HandleLogin}
										value="Sign Up"
									/>
								</div>
								<div className="signin">
									<span>
										Already have an account?{" "}
										<button onClick={() => HandleCreateAccount()}>
											Register here
										</button>
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

export default Login;
