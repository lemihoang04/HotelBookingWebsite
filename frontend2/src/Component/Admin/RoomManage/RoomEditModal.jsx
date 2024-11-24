import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const EditRoomModal = ({ toggle, isOpen, room, onSave }) => {
  const [formData, setFormData] = useState({
    RoomType: "",
    Price: "",
    Availability: 1,
    Features: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (room) {
      setFormData({
        RoomType: room.RoomType || "",
        Price: room.Price || "",
        Availability: room.Availability || 1,
        Features: room.Features || "",
      });
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.RoomType) newErrors.RoomType = "Room Type is required";
    if (!formData.Price || isNaN(formData.Price)) newErrors.Price = "Valid price is required";
    if (![0, 1].includes(Number(formData.Availability)))
      newErrors.Availability = "Availability must be 0 or 1";
    if (!formData.Features) newErrors.Features = "Features are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({ ...room, ...formData });
      toggle();
    }
  };

  return (
    <Modal show={isOpen} onHide={toggle} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Edit Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Room Type</Form.Label>
            <Form.Control
              type="text"
              name="RoomType"
              value={formData.RoomType}
              onChange={handleChange}
              required
              isInvalid={!!errors.RoomType}
            />
            <Form.Control.Feedback type="invalid">
              {errors.RoomType}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              required
              isInvalid={!!errors.Price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Availability</Form.Label>
            <Form.Control
              as="select"
              name="Availability"
              value={formData.Availability}
              onChange={handleChange}
              required
              isInvalid={!!errors.Availability}
            >
              <option value={1}>Available</option>
              <option value={0}>Booked</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.Availability}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Features</Form.Label>
            <Form.Control
              type="text"
              name="Features"
              value={formData.Features}
              onChange={handleChange}
              required
              isInvalid={!!errors.Features}
            />
            <Form.Control.Feedback type="invalid">
              {errors.Features}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRoomModal;
