import { Fragment, useContext, useEffect, useState } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Component/NavBar/NavBar";
import { Oval } from "react-loader-spinner";
import Footer from "./Component/Footer/Footer";
import ClientRoute from "./Routers/ClientRoute";
import "../src/assets/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import { UserContext } from "./Context/UserProvider";

function App() {
	const { user } = useContext(UserContext);
	return (
		<>
			<Router>
				{user && user.isLoading ? (
					<div className="loading-container">
						<Oval
							visible={true}
							height="80"
							width="80"
							color="#4fa94d"
							ariaLabel="oval-loading"
							wrapperStyle={{}}
							wrapperClass=""
						/>
						<div>Loading Data....</div>
					</div>
				) : (
					<>
						<div className="app-header">
							<NavBar />
						</div>
						<div className="app-container">
							<ClientRoute />
						</div>
						<div className="app-footer">
							<Footer />
						</div>
					</>
				)}
			</Router>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	);
}

export default App;
