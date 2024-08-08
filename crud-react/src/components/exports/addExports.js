import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import './addExports.css';

function AddExport() {
  const [furniture, setFurniture] = useState([]);
  const [formData, setFormData] = useState({
    FurnitureId: '',
    ExportDate: '',
    Quantity: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const response = await axios.get('http://localhost:5000/furniture');
        setFurniture(response.data);
      } catch (error) {
        console.error('Error fetching furniture data:', error);
      }
    };

    fetchFurniture();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/export', formData);
      alert(response.data.message);
      setFormData({ FurnitureId: '',ExportDate: '',Quantity: '' });
      navigate("/getExport");
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    navigate("/");
    }
  };

  return (


    <div className="center-form">
      <h1>Post Exports</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicId">
      <Form.Label  htmlFor="FurnitureId">FurnitureName:</Form.Label>
        <Form.Select name="FurnitureId" value={formData.FurnitureId} onChange={handleChange} required>
          <option value="">-----select-----</option>
          {furniture.map(item => (
            <option key={item._id} value={item.FurnitureId}>
              {item.FurnitureName}
            </option>
          ))}
        </Form.Select>
        <Form.Label  htmlFor="ExportDate">ExportDate:</Form.Label>
        <Form.Control type="date"
         name="ExportDate" 
         value={formData.ExportDate}
         onChange={handleChange}
         required
         placeholder="Enter ExportDate" />
        
        <Form.Label  htmlFor="Quantity">Quantity:</Form.Label>
        <Form.Control type="number"
         name="Quantity"
          value={formData.Quantity}
          onChange={handleChange}
          required
        />
        </Form.Group>
     <Button variant="primary" type="submit"> Submit </Button>
    </Form></div>
  
  );
}

export default AddExport;