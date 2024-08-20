import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function UpdateExport() {
  const { ExportId } = useParams();
  console.log(ExportId);
  const [ex, setExport] = useState({
   
    ExportDate: '',
    Quantity: '',
  });
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (ExportId) {
      axios.get(`http://localhost:5000/export/${ExportId}`)
        .then(res => {
          console.log('Response data:', res.data); // Log response data
          setExport(res.data);
        })
        .catch(err => console.error('Error fetching export:', err));
    }
  }, [ExportId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExport(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClose = () => setShow(false);
  const handleSave = () => {
    axios.put(`http://localhost:5000/export/${ExportId}`, ex)
      .then(res => {
        console.log('Data saved:', res.data);
        navigate("/getExport");
        setShow(false); // Close the modal after saving
      })
      .catch(err => {
        console.error('Error saving Export:', err);
      });
  };

  return (

<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
  <Modal.Title>Edit Export</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Form>
    <Form.Group controlId="ExportDate">
      <Form.Label>Export Date</Form.Label>
      <Form.Control
        type="text"
        name="ExportDate"
        value={ex.ExportDate}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formQuantity">
      <Form.Label>Quantity</Form.Label>
<Form.Control
type="text"
name="Quantity"
value={ex.Quantity}
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

export default UpdateExport;