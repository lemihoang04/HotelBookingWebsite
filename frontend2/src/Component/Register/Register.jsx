import React, { useState } from "react";
import "../Login/login.css";
import blogImage from "../../assets/images/blog-1.jpg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CreateNewUser } from "../../services/userService";
import { toast } from "react-toastify";
const Register = () => {
	const history = useHistory();
	const [formValues, setFormValues] = useState({
		Email: "",
		Password: "",
		Name: "",
		Phone: "",
	});
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};
	const HandleLogin = () => {
		history.push("/login");
	};
	const HandleRegister = async () => {
		let res = await CreateNewUser(formValues);
		if (res && res.errCode === 0) {
			toast.success(res.message);
			history.push("/login");
		}
	};
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
								<header>Register</header>
								<div className="input-field">
									<input
										type="text"
										className="input"
										required=""
										id="Email"
										name="Email"
										value={formValues.Email}
										onChange={handleInputChange}
										autoComplete="off"
									/>
									<label htmlFor="email">Email</label>
								</div>
								<div className="input-field">
									<input
										type="text"
										className="input"
										id="Name"
										name="Name"
										value={formValues.Name}
										onChange={handleInputChange}
										required=""
										autoComplete="off"
									/>
									<label htmlFor="Name">Full Name</label>
								</div>
								<div className="input-field">
									<input
										type="text"
										className="input"
										id="Phone"
										required=""
										name="Phone"
										value={formValues.Phone}
										onChange={handleInputChange}
										autoComplete="off"
									/>
									<label htmlFor="Phone">Phone</label>
								</div>
								<div className="input-field">
									<input
										type="password"
										name="Password"
										value={formValues.Password}
										onChange={handleInputChange}
										className="input"
										id="pass"
										required=""
									/>
									<label htmlFor="pass">Password</label>
								</div>
								<div className="input-field">
									<input
										type="button"
										className="submit"
										onClick={HandleRegister}
										value="Sign Up"
									/>
								</div>
								<div className="signin">
									<span>
										Already have an account?{" "}
										<button onClick={HandleLogin}>Login here</button>
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
