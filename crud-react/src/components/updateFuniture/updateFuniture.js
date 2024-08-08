import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function UpdateFurniture (){
    const { FurnitureId } = useParams();
    const [furnitures, setFurnitures] = useState([]);
    //const navigate = useNavigate(); // Added useNavigate hook

    useEffect(() => {
        axios.get('http://localhost:5000/furniture/'+FurnitureId)
            .then(res => {
                setFurnitures(res.data);
            })
            .catch(err=> console.log(err));
    }, [FurnitureId]);
            // Set the fetched data to values state
            //.catch (err=> console.log(err))
            
            
    
   // }, []);

    

    return (
        <Modal show >
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
                          value={furnitures.FurnitureName}
                                 />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            name="Price"
                            value={furnitures.Price}
                          
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" >
                    Close
                </Button>
                <Button variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateFurniture;
