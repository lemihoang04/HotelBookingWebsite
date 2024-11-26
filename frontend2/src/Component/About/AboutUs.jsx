import React from "react";
import "../About/about.css";

const AboutUs = () => {
	return (
		<>
			<div className="breadcrumb-section">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="breadcrumb-text">
								<h2>Our Rooms</h2>
								<div className="bt-option">
									<a href="/">Home</a>
									<span>About Us</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container my-5">
				<h2 className="about-text1">About Us</h2>
				<div className="underline"></div>
				<div className="section-title mt-4">
				Welcome to Sora, your haven of comfort and elegance. Nestled in the heart of Lien Chieu, Da Nang, our hotel offers a harmonious blend of modern luxury and warm hospitality. Whether you’re here to explore the city or unwind in tranquility, we provide the perfect setting to make your stay unforgettable. From stylish accommodations to world-class amenities, every detail is designed with your satisfaction in mind.
				</div>
				<div className="section-content mt-3">
				At Sora, we go beyond providing a place to stay—we create experiences that linger long after your departure. Savor exquisite dining, relax in our serene spaces, or let our dedicated team assist you with tailored services to meet your needs. Whatever your journey entails, Sora is here to ensure it’s exceptional in every way.
				</div>
			</div>
			{/* <div className="container my-5">
				<h2 className="about-text1">Our Services</h2>
				<div className="underline"></div>
				<div className="section-title mt-4">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat quos
					incidunt repellendus reprehenderit molestias culpa, aperiam nobis
					provident sit architecto repellat fuga nostrum ratione. Est facilis
					laboriosam provident doloribus iste.
				</div>
				<div className="section-content mt-3">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</div>
			</div> */}
			<div className="container my-5">
				<h2 className="about-text1">Our Location</h2>
				<div className="underline"></div>
				<div className="map mt-4">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.842405348615!2d108.14729407328178!3d16.07366573932284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218d68dff9545%3A0x714561e9f3a7292c!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBLaG9hIC0gxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1732544467676!5m2!1svi!2s" 
						width="100%"
						height="450"
						style={{ border: 0 }}
						allowFullScreen=""
						loading="lazy"
					></iframe>
				</div>
			</div>
		</>
	);
};

export default AboutUs;
