import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import room1 from "../img/room/room-1.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./room.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GetAllRooms } from "../../services/apiService";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import { toast } from "react-toastify";

const Room = () => {
  const history = useHistory();
  const [rooms, setRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 9;

  // Function to get data from the API
  const GetDataRooms = async () => {
    let response = await GetAllRooms();
    const sortedRooms = response.sort((a, b) => a.Availability - b.Availability);
    setRooms(sortedRooms);
  };

  const { formValues } = useContext(UserContext);

  useEffect(() => {
    GetDataRooms();
  }, []);

  // Handle click for booking a room
  const HandleClick = (data) => {
    if (data.Availability === 0) {
      history.push(`/rooms/id_room=${data.RoomID}`, data);
    } else {
      toast.error("Room has been Booked");
    }
  };

  // Filter rooms based on selected room type
  const filteredRooms = selectedRoomType
    ? rooms.filter((room) => room.RoomType === selectedRoomType)
    : rooms;

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);    
  return (
    <>
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Our Rooms</h2>
                <div className="bt-option">
                  <a href="./">Home</a>
                  <span>Rooms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown for filtering room types */}
      <div className="container my-4">
        <div className="row">
          <div className="col-lg-4">
            <label htmlFor="roomTypeDropdown" className="form-label">
              Room Type
            </label>
            <select
              className="form-select"
              value={selectedRoomType}
              onChange={(e) => {
                setSelectedRoomType(e.target.value);
                setCurrentPage(1); 
              }}
            >
              <option value="">All Room Types</option>
              <option value="Standard Room">Standard Room</option>
              <option value="Suite Room">Suite Room</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Family Room">Family Room</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Section Begin */}
      <section className="rooms-section spad">
        <div className="container">
          <div className="row">
            {currentRooms.length > 0 ? (
              currentRooms.map((item, index) => {
                const isBooked = item.Availability === 1;
                return (
                  <div
                    className={`col-lg-4 col-md-6 mb-4 d-flex align-items-stretch`}
                    key={index}
                  >
                    <div className={`room-item ${isBooked ? "booked" : ""}`}>
                      <img
                        src={`http://127.0.0.1:5000/load/${item.Image}`}
                        alt=""
                      />
                      {isBooked && <div className="booked-overlay">Booked</div>}
                      <div className="ri-text">
                        <h4>{item.RoomType}</h4>
						<div><p>Room Number: {item.RoomID}</p></div>
                        <h3>
                          {item.Price}$<span>/Pernight</span>
                        </h3>
                        {!isBooked ? (
                          <button
                            type="button"
                            onClick={() => HandleClick(item)}
                            className="btn btn-primary"
                          >
                            More Details
                          </button>
                        ) : (
                          <button className="btn btn-secondary" disabled>
                            Unavailable
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center">
                <p>No rooms available for the selected type.</p>
              </div>
            )}
          </div>

          <div className="col-lg-12">
            <nav aria-label="Room page navigation">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, pageIndex) => (
                  <li
                    className={`page-item ${currentPage === pageIndex + 1 ? "active" : ""}`}
                    key={pageIndex}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(pageIndex + 1)}
                    >
                      {pageIndex + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default Room;
