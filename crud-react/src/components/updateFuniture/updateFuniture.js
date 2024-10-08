import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function UpdateFurniture() {
  const { FurnitureId } = useParams();
  console.log(FurnitureId);
  const [furniture, setFurniture] = useState({
    FurnitureName: '',
    Price: ''
  });
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (FurnitureId) {
      axios.get(`http://localhost:5000/furniture/${FurnitureId}`)
        .then(res => {
          console.log('Response data:', res.data); // Log response data
          setFurniture(res.data);
        })
        .catch(err => console.error('Error fetching furniture:', err));
    }
  }, [FurnitureId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFurniture(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClose = () => setShow(false);
  const handleSave = () => {
    axios.put(`http://localhost:5000/furniture/${FurnitureId}`, furniture)
      .then(res => {
        console.log('Data saved:', res.data);
        navigate("/getFurniture");
        setShow(false); // Close the modal after saving
      })
      .catch(err => {
        console.error('Error saving furniture:', err);
      });
  };

  return (

<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
  <Modal.Title>Edit Furniture</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Form>
    <Form.Group controlId="FurnitureName">
      <Form.Label>Furniture Name</Form.Label>
      <Form.Control
        type="text"
        name="FurnitureName"
        value={furniture.FurnitureName}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formPrice">
      <Form.Label>Price</Form.Label>
<Form.Control
type="text"
name="Price"
value={furniture.Price}
onChange={handleChange}
/>
</Form.Group>
</Form>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Close
</Button>
<Button variant="primary" onClick={handleSave}>
Save Changes
</Button>
</Modal.Footer>
</Modal>
);
}

export default UpdateFurniture;