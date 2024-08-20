import React, { useEffect, useState } from 'react';
import {Nav,Button,Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './getExport.css';
import axios from 'axios';

function GetExport() {
    const [exports, setexport] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/export')
            .then(response => response.json())
            .then(data => setexport(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = (ExportId) => {
        const confirmDelete = window.confirm("Do you really want to delete this item?");
        if (confirmDelete) {
            axios.delete(`http://localhost:5000/export/${ExportId}`)
                .then(res => {
                    alert("Record has been deleted");

                    // Update the state to remove the deleted item
                    setexport(prevExports => prevExports.filter(item => item._id !== ExportId));
                })
                .catch(err => console.log('Error deleting item:', err));
        }
    };


    return (
        <div align="center">
            <h1>Export Data</h1>
            <Button variant ='secondary'><Nav.Link as={Link} to='/export' className='nav-link'>Add Export</Nav.Link></Button>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Furniture Name</th>
                        <th>Export Date</th>
                        <th>Quantity</th>
                        <th colSpan={2}>Actions</th>
                     
                       
                    </tr>
                </thead>
                <tbody>
                    {exports.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index+1}</td>
                            <td>{item.FurnitureId}</td>
                            <td>{item.ExportDate}</td>
                            <td>{item.Quantity}</td>
                            <td> <Link className='btn btn-success mx-1' to={`/updateExport/${item._id}`}>Edit</Link>
                                <Button
                                    variant='danger'
                                    className='mx-1'
                                    onClick={() => handleDelete(item._id)}
                                >Delete</Button></td>
                        </tr>
                         
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
export default GetExport;