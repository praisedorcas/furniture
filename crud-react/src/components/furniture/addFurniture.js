import React, { useState } from 'react';
import {Form,Button} from 'react-bootstrap';
import axios from 'axios';
import './addFurniture.css';
import {useNavigate} from 'react-router-dom';

function AddFurniture() {
  const [formData, setFormData] = useState({
    
    FurnitureName: '',
    Price: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/furniture', formData);
      alert(response.data.message);
      setFormData({ FurnitureName: '',Price: '' }); // Clear form after successful submission
      navigate("/getFurniture");
    } catch (error) {
      console.error('Error adding furniture item:', error);
      alert('Error adding furniture item');
      navigate("/");
    }
  };

  return (
    
    <div className='center-form'>
      <h1>Post Furniture</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>FurnitureName:</Form.Label>
        <Form.Control type="text"
         name="FurnitureName" 
         value={formData.FurnitureName}
         onChange={handleChange}
        required 
         placeholder="Enter FurnitureName" />
       <Form.Label>Price</Form.Label>
        <Form.Control type="text"
         name="Price" 
         value={formData.Price}
         onChange={handleChange}
        required 
         placeholder="Enter Price" />
      
     </Form.Group>
     <Button variant="primary" type="submit"> Submit </Button>
    </Form></div>
  );
}

export default AddFurniture;



