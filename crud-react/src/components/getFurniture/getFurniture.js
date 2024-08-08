import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
;


function GetFurniture() {
    const [furnitures, setFurnitures] = useState([]);
    //const navigate = useNavigate(); // Added useNavigate hook

    useEffect(() => {
        axios.get('http://localhost:5000/furniture')
            .then(res => {
                setFurnitures(res.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = async (FurnitureId) => {
        try {
            await axios.delete(`http://localhost:5000/furniture/${FurnitureId}`);
            setFurnitures(furnitures.filter(item => item._id !== FurnitureId));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };
    return (
        <div align="center">
            <h1>Furniture Data</h1>
            <Link to='/furniture' className='btn btn-success my-3'>Add Furniture</Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Furniture Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {furnitures.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.FurnitureName}</td>
                            <td>{item.Price}</td>
                            <td>
                                <Link className='btn btn-success mx-1' to={`/updateFuniture/${item._id}`}>Edit</Link>
                                <Button variant='danger' className='mx-1' onClick={() => handleDelete(item._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default GetFurniture;