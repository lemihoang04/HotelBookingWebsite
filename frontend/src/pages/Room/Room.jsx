import React from "react";
import room1 from '../img/room/room-1.jpg'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./room.css";

const Room = () => {
	return (
        <>
            <div className="breadcrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <h2>Our Rooms</h2>
                                <div className="bt-option">
                                    <a href="./home.html">Home</a>
                                    <span>Rooms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Breadcrumb Section End */}

            {/* Rooms Section Begin */}
            <section className="rooms-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="room-item">
                                <img src={room1} alt="" />
                                <div className="ri-text">
                                    <h4>Premium King Room</h4>
                                    <h3>159$<span>/Pernight</span></h3>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="r-o">Size:</td>
                                                <td>30 ft</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Capacity:</td>
                                                <td>Max person 3</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Bed:</td>
                                                <td>King Beds</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Services:</td>
                                                <td>Wifi, Television, Bathroom,...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <a href="#" className="primary-btn">More Details</a>
                                </div>
                            </div>
                        </div>

                        {/* Add other room items similarly */}
                        <div className="col-lg-4 col-md-6">
                            <div className="room-item">
                            <img src={room1} alt="" />
                                <div className="ri-text">
                                    <h4>Deluxe Room</h4>
                                    <h3>159$<span>/Pernight</span></h3>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="r-o">Size:</td>
                                                <td>30 ft</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Capacity:</td>
                                                <td>Max person 5</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Bed:</td>
                                                <td>King Beds</td>
                                            </tr>
                                            <tr>
                                                <td className="r-o">Services:</td>
                                                <td>Wifi, Television, Bathroom,...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <a href="#" className="primary-btn">More Details</a>
                                </div>
                            </div>
                        </div>
                        
                        {/* Tiếp tục các mục phòng khác tương tự */}
                        
                        <div className="col-lg-12">
  <nav aria-label="Room page navigation">
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <a className="page-link" href="#">
          1
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#">
          2
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#">
          Next <i className="fa fa-long-arrow-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Room;
