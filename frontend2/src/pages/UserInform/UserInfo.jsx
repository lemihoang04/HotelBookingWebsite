import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../Context/UserProvider";
import "../UserInform/userInfo.css";
import { EditUserService } from "../../services/userService";
import { toast } from "react-toastify";
const UserInfo = () => {
	const { user, loginContext, fetchUser } = useContext(UserContext);
	const [isShowPass, SetIsShowPass] = useState(false);
	const [formValues, setFormValues] = useState({
		Email: "",
		Password: "",
		Name: "",
		Phone: "",
	});
	useEffect(() => {
		if (user.account) {
			setFormValues({
				Email: user.account.Email || "",
				Password: "",
				Name: user.account.Name || "",
				Phone: user.account.Phone || "",
			});
		}
	}, [user.account]);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Updated Profile Data:", formValues);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};
	const HandleShowHide = () => {
		SetIsShowPass(!isShowPass);
	};
	const HandleUpdate = async () => {
		let response = await EditUserService(user.account.UserID, formValues);
		if (response && response.errCode === 0) {
			toast.success("Update Success");
			let data = {
				isAuthenticated: true,
				account: formValues,
				isLoading: false,
			};
			loginContext(data);
			fetchUser();
		} else {
			toast.error(response.error);
		}
	};
	return (
		<div className="container mt-5 mb-5">
			<div className="card shadow">
				<div className="card-body">
					<h3 className="card-title mb-4">My Profile</h3>
					<div className="row mb-3">
						<div className="col-md-6">
							<label className="form-label">Full Name</label>
							<input
								type="text"
								className="form-control"
								name="Name"
								onChange={handleInputChange}
								value={formValues.Name}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">PassWord</label>
							<div className="input-wrapper">
								<input
									type={isShowPass ? "text" : "password"}
									className="form-control"
									onChange={handleInputChange}
									name="Password"
									value={formValues.Password}
								/>
								<span className="eye-icon" onClick={() => HandleShowHide()}>
									<i
										className={
											isShowPass ? "far fa-eye-slash eye" : "far fa-eye eye"
										}
									></i>
								</span>
							</div>
						</div>
					</div>
					<div className="row mb-3">
						<div className="col-md-6">
							<label className="form-label">Phone</label>
							<input
								type="text"
								className="form-control"
								name="Phone"
								value={formValues.Phone}
								onChange={handleInputChange}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">Email address</label>
							<input
								type="email"
								className="form-control"
								name="Email"
								value={formValues.Email}
								onChange={handleInputChange}
								disabled
							/>
						</div>
					</div>
					<button
						type="button"
						onClick={() => HandleUpdate()}
						className="btn btn-primary"
					>
						Update Profile
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
