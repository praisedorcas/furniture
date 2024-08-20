import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
//import {useNavigate} from 'react-router-dom';

function GetFurniture() {
    const [furnitures, setFurnitures] = useState([]);
   // const navigate = useNavigate(); // Added useNavigate hook

    useEffect(() => {
        axios.get('http://localhost:5000/furniture')
            .then(res => {
                setFurnitures(res.data);
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                  alert("Item not found. It might have already been deleted.");
                } else {
                  console.error('Error deleting furniture:', err);
                  alert(`Failed to delete the item: ${err.response?.status} - ${err.response?.statusText}`);
     } })
           // .catch(error => console.error('Error fetching data:', error));
    }, []);
    const handleDelete = (FurnitureId) => {
        const confirmDelete = window.confirm("Do you really want to delete this item?");
        if (confirmDelete) {
            axios.delete(`http://localhost:5000/furniture/${FurnitureId}`)
                .then(res => {
                    alert("Record has been deleted");

                    // Update the state to remove the deleted item
                    setFurnitures(prevFurnitures => prevFurnitures.filter(item => item._id !== FurnitureId));
                })
                .catch(err => console.log('Error deleting furniture:', err));
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
                                <Button
                                    variant='danger'
                                    className='mx-1'
                                    onClick={() => handleDelete(item._id)}
                                >Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    
   /* function handleSubmit(FurnitureId){ 
        const conf = window.confirm("do you want to delete");
if(conf){
    axios.delete('http://localhost:5000/furniture/'+FurnitureId)
    .then(res => {
        alert("record has deleted")
        navigate("/getFurniture")
    }).catch(err=>console.log(err))*/
    )}
    
    


export default GetFurniture;