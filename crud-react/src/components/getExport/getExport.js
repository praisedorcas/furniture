import React, { useEffect, useState } from 'react';
import {Nav,Button,Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './getExport.css';

function GetExport() {
    const [exports, setexport] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/export')
            .then(response => response.json())
            .then(data => setexport(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
                            <td><Button variant ='success'>Edit</Button></td>
                            <td><Button variant ='danger'>Delete</Button></td>
                        </tr>
                         
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
export default GetExport;